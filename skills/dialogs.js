module.exports = function(controller) {
    // validation
    controller.middleware.receive.use(function validateDialog(bot, message, next) {
        if (message.type == 'dialog_submission') {
            if (false) {
                bot.dialogError({
                    "name": "number",
                    "error": "Please specify a value below 100"
                });
                return;
            }
        }
        next();
    });

    // handle a dialog submission
    // the values from the form are in event.submission    
    controller.on('dialog_submission', function (bot, message) {
        var submission = message.submission;
        bot.reply(message, 'Got it!');

        // call dialogOk or else Slack will think this is an error
        bot.dialogOk();
    });


}
