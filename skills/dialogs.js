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
        console.log(message);
        bot.reply(message, 'Got it!');
        /*
        request({
            url: "http://${github_user_id}@${process.env.github_access_token}:api.github.com/repos/:${github_user_id}/:${github_reponame}/issues",
            method: "POST",
            json: true,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "UA(必須)"
            },
            form: {
                "title": "fuga"
            }
            }
        }, (err, res) => {
            if (err) {
                console.log(err);
                return false;
            }
            return res;
        });
        */
        // call dialogOk or else Slack will think this is an error
        bot.dialogOk();
    });


}
