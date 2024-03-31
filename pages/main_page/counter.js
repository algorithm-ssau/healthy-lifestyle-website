$(".calculator input").on("input change", function (event) {
    var parameterName = $(this).attr("id").split("calc-")[1];
    var centimeters = $(this).val()

    switch (parameterName) {
        case "height":
            $("#calc-height_value").html("Рост: " + centimeters + " cm");
            break;
        case "weight":
            var kg = $(this).val();
            $("#calc-weight_value").html("Вес: " + kg + " кг");
            break;
        case "age":
            $("#calc-age_value").html("Возраст: " + $(this).val());
            break;
        case "cardio":
            $("#calc-cardio_value").html("Кардиотренировки: " + $(this).val() + " часов в неделю");
            break;
        case "walking":
            $("#calc-walking_value").html("Прогулки: " + $(this).val() + " часов в неделю");
            break;
    }

    var height = parseInt($("#calc-height").val(), 10);
    var age = parseInt($("#calc-age").val(), 10);
    var weight = parseInt($("#calc-weight").val(), 10);
    var walking = parseInt($("#calc-walking").val(), 10);
    var cardio = parseInt($("#calc-cardio").val(), 10);
    var gender = $(".calculator input[name='gender']:checked").val();

    // The Harris–Benedict equations revised by Mifflin and St Jeor in 1990: 'A new predictive equation for resting energy expenditure in healthy individuals'
    var bmr = parseInt(10 * weight + 6.25 * height - 5 * age, 10) + (gender === "male" ? 5 : -161);
    bmr = bmr * 1.2;
    bmr += walking * 60 * (.03 * weight * 1 / 0.45) / 7;
    bmr += cardio * 60 * (.07 * weight * 1 / 0.45) / 7;
    bmr = Math.floor(bmr);

    var targetGainWeight = Math.round((bmr + 300) / 100) * 100;
    var targetMaintain = Math.round((bmr) / 100) * 100;
    var targetLoseWeight = Math.round((bmr - 500) / 100) * 100;

    $("#calc-target-gain span").html(targetGainWeight + " каллорий");
    $("#calc-target-maintain span").html(targetMaintain + " каллорий");
    $("#calc-target-lose span").html(targetLoseWeight + " каллорий");
});