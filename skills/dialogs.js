var request = require('request');

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
        bot.reply(message, "OK, I'll make it! Wait a second...");
        
        res = request({
            url: "http://${process.env.githubUserId}@${process.env.githubAccessToken}:api.github.com/repos/:${process.env.githubUserId}/:${process.env.githubReponame}/issues",
            method: "POST",
            json: true,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.symmetra-preview+json",
            },
            form: {
                "title": message.submission.title,
                "body": message.submission.body
            }
        }, (err, res) => {
            if (err) {
                console.log(err);
                return false;
            }
            return res;
        });
        bot.reply(res);
        
        // call dialogOk or else Slack will think this is an error
        bot.dialogOk();
    });


}
