window.onload = () => {
    window.ui = SwaggerUIBundle({
        url: "assets/openapi.yaml",
        dom_id: "#swagger-ui",
        validatorUrl: false,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: "StandaloneLayout",
    });
};
