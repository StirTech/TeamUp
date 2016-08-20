var Notification = require('./notificationModel.js');
module.exports ={
	insertNotification : function (req, res) {
		var body = req.body;
		console.log(body)
		var newNotification = new Notification({
			from : body.from,
			to   : body.to, 
			game : req.params.id,
			read : body.read,
			text : body.text
		})
		newNotification.save(function (err, Notification) {
			if(Notification){
				res.status(200).send(Notification);
			}else{
				res.status(500).send(err);
			}
		});
	},


	isRead: function (req, res) {
		Notification.findOne({_id : req.body.notificationID}, function (err, notification) {
			if(Notification){
				notification.read = true;
				notification.save(function (err, readNotification) {
					if(readNotification){
						res.status(200).send(readNotification);
					}else{
						res.status(500).send(err);
					}
				})
			}else{
				res.status.send(500);
			}
		})
	},

	getNotification : function (req, res) {
		Notification.findOne({to : req.params.id}, function (err, notification) {
			if(notification){
				res.status(200).send(notification)
			}else{
				res.status(500).send(err)
			}
		})
	}
};

