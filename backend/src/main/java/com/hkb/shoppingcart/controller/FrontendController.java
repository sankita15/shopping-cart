package com.hkb.shoppingcart.controller;

import com.hkb.shoppingcart.frontend.FrontendSourcesProvider;
import com.hkb.shoppingcart.frontend.PageProps;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

@RequestMapping
@Controller
@RequiredArgsConstructor
public class FrontendController {

    private final FrontendSourcesProvider frontendSourcesProvider;

    @GetMapping({
        "/",
        "/login",
        "/products",
        "/products/{id}",
        "/carts"
    })
    String serveLoginPage(Model model) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        model.addAttribute("pageProps", PageProps.builder().cookies(username).build());
        model.addAttribute("stylesheet", frontendSourcesProvider.getStylesheet());
        model.addAttribute("mainScript", frontendSourcesProvider.getMainScript());

        return "page";
    }

    @GetMapping("/index")
    public void method(HttpServletResponse response){
        response.setHeader(HttpHeaders.LOCATION, "/");
        response.setStatus(HttpStatus.FOUND.value());
    }
//second way of doing redirection
//    @GetMapping(value="/index")
//    public ModelAndView method(){
//        return new ModelAndView("redirect:" + "/");
//    }


}
