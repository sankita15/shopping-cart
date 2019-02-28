package com.hkb.shoppingcart.frontend;

import lombok.Builder;
import lombok.Value;

@Value
@Builder(toBuilder = true)
public class PageProps {
    String user;
}
