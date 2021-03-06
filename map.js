(function () {
    window.onload = function () {
        var kpi_selector_html = function (kpis, title, enabled, selector_class) {
            kpis_html = "";
            kpis_count = 0;
            for (var column in kpis) {
                kpis_html += '<li><a class="layer" style="width: 204px" href="#">' + kpis[column] + '</a><a id="' + column + '" href="#" class="kpi right ' + (column === enabled ? 'enabled' : 'disabled') + ' switch"><span class="handle"></span></a></li>';
                kpis_count++;
            }
            return '<div class="cartodb-layer-selector-box ' + selector_class + '" style="display: block;"><a href="#" class="layers kpis">' + title + '<div class="count">' + kpis_count + '</div></a><div class="cartodb-dropdown border" style="width: 260px; top: 35px; left: -116.9999px;"><ul>' + kpis_html + '</ul><div class="tail"><span class="border"></span></div></div></div>';
        };

        var city_kpis = {
            city_rating: "City rating",
            security: "Security risk",
            regime_instability: "Regime instability",
            civil_conflict: "Civil conflict",
            interstate_conflict: "Interstate conflict",
            civil_unrest: "Civil unrest",
            terrorism: "Terrorism",
            street_crime: "Street crime",
            serious_crime: "Serious crime",
            kidnap: "Kidnap",
            state_agencies: "State agencies",
            rule_of_law: "Rule of law",
            corruption: "Corruption",
            legal_and_regulatory: "Legal and regulatory",
            natural_disaster: "Natural hazards",
            infrastructure: "Infrastructure",
            medical_health: "Medical & health",
            country_risk: "Country risk"
        };

        var country_kpis = {
            country_rating: "Country rating",
            security_risk: "Security risk",
            regime_instability: "Regime instability",
            civil_conflict: "Civil conflict",
            interstate_conflict: "Interstate conflict",
            civil_unrest: "Civil unrest",
            terrorism: "Terrorism",
            street_crime: "Street crime",
            serious_crime: "Serious crime",
            kidnap: "Kidnap",
            state_agencies: "State agencies",
            rule_of_law: "Rule of law",
            corruption: "Corruption",
            legal_and_regulatory: "Legal and regulatory",
            natural_hazards: "Natural hazards",
            infrastructure: "Infrastructure",
            medical_health: "Medical & health"
        };

        var vizJson = "https://riskadvisory-admin.carto.com/api/v2/viz/57f978d6-f504-11e6-8111-0ecd1babdde5/viz.json";
        cartodb.createVis("map", vizJson, {shareable: false, legends: false})
        .done(function(vis, layers) {
            $(".cartodb-map-wrapper").prepend(kpi_selector_html(city_kpis, "City ratings", "city_rating", "cities"));
            layers[1].setCartoCSS(1, "#layer {marker-width: 7; marker-fill: ramp([city_rating], (#43618F, #4E71A6, #6182B5, #849EC5, #9BB0D0, #B2C2DB, #ECF0F6), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #FFF; marker-line-opacity: 1;}", cartodb.CARTOCSS_DEFAULT_VERSION);
            $(".cartodb-map-wrapper").prepend(kpi_selector_html(country_kpis, "Country ratings", "country_rating", "countries"));
            layers[1].setCartoCSS(0, "#layer {polygon-fill: ramp([country_rating], (#43618F, #4E71A6, #6182B5, #849EC5, #9BB0D0, #B2C2DB, #ECF0F6), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5;}", cartodb.CARTOCSS_DEFAULT_VERSION);
            $(".cartodb-map-wrapper").append('<div class="cartodb-legend-stack" style="display: block;"><div class="cartodb-legend choropleth" style="display: block;"><div class="legend-title">Total Country/City Rating</div><ul><li class="min">1</li><li class="max">96</li><li class="graph count_441"><div class="colors"><div class="quartile" style="background-color:#ECF0F6"></div><div class="quartile" style="background-color:#B2C2DB"></div><div class="quartile" style="background-color:#9BB0D0"></div><div class="quartile" style="background-color:#849EC5"></div><div class="quartile" style="background-color:#6182B5"></div><div class="quartile" style="background-color:#4E71A6"></div><div class="quartile" style="background-color:#43618F"></div></div></li></ul></div><div class="cartodb-legend category" style="display: block;"><div class="legend-title">Others</div><ul><li><div class="bullet" style="background: #B1BEC8"></div> NEGLIGIBLE</li><li><div class="bullet" style="background: #9EA615"></div> LOW</li><li><div class="bullet" style="background: #E3CA25"></div> MODERATE</li><li><div class="bullet" style="background: #F26432"></div> SUBSTANTIAL/HIGH</li><li><div class="bullet" style="background: #DA383F"></div> SEVERE</li><li><div class="bullet" style="background: #7E150A"></div> CRITICAL/EXTREME</li></ul></div></div>');

            layers[1].layers[0].infowindow.template = $('#infowindow_template').html();
            layers[1].layers[1].infowindow.template = $('#infowindow_template').html();

            layers[1].setCartoCSS(0, "#layer {polygon-fill: ramp([country_rating], (rgba(236,240,246,.6), rgba(178,194,219,.6), rgba(155,176,208,.6), rgba(132,158,197,.6), rgba(97,130,181,.6), rgba(78,113,166,.6), rgba(67,97,143,.6)), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5;}", cartodb.CARTOCSS_DEFAULT_VERSION);

            $(".kpis").click(function () {
                event.stopPropagation();
                event.preventDefault();
                $(this).parent().children(".cartodb-dropdown").toggle();
            });
            $(".kpi").click(function (event) {
                event.stopPropagation();
                event.preventDefault();
                $(this).removeClass("disabled");
                $(this).addClass("enabled");
                $(this).parent().parent().find('.kpi').not(this).each(function () {
                    $(this).removeClass("enabled");
                    $(this).addClass("disabled");
                });
                if ($(this).parents('.cities').length) {
                    if ($(this).attr("id") == "city_rating") {
                        layers[1].setCartoCSS(1, "#layer {marker-width: 7; marker-fill: ramp([city_rating], (#ECF0F6, #B2C2DB, #9BB0D0, #849EC5, #6182B5, #4E71A6, #43618F), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #FFF; marker-line-opacity: 1;}", cartodb.CARTOCSS_DEFAULT_VERSION);
                    } else {
                        layers[1].setCartoCSS(1, "#layer {marker-width: 7; marker-fill: ramp([" + $(this).attr("id") + '], (#B1BEC8, #9EA615, #E3CA25, #F26432, #DA383F, #7E150A), (1, 2, 3, 4, 5, 6), "=", category); marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #FFF; marker-line-opacity: 1;}', cartodb.CARTOCSS_DEFAULT_VERSION);
                    }
                } else if ($(this).parents('.countries').length) {
                    if ($(this).attr("id") == "country_rating") {
                        layers[1].setCartoCSS(0, "#layer {polygon-fill: ramp([country_rating], (rgba(236,240,246,.6), rgba(178,194,219,.6), rgba(155,176,208,.6), rgba(132,158,197,.6), rgba(97,130,181,.6), rgba(78,113,166,.6), rgba(67,97,143,.6)), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5;}", cartodb.CARTOCSS_DEFAULT_VERSION);
                    } else {
                        layers[1].setCartoCSS(0, "#layer {polygon-fill: ramp([" + $(this).attr("id") + '], (rgba(177,190,200,.6), rgba(158,166,21,.6), rgba(227,202,37,.6), rgba(242,100,50,.6), rgba(218,56,63,.6), rgba(126,21,10,.6)), (1, 2, 3, 4, 5, 6), "=", category); line-width: 1; line-color: #FFF; line-opacity: 0.5;}', cartodb.CARTOCSS_DEFAULT_VERSION);
                    }
                }
            });
        });
    };
})();
