var express = require('express')
var app = express()

//show list of my data
app.get('/list', function(req, res, next) {
	req.getConnection(function(error,conn) {
	conn.query('SELECT * FROM parameter ORDER BY id DESC',function(err, rows, fields) {
		if (err) {
			req.flash('error', err)
				res.render('web/list', {
					title: 'List All Data',
					data: ''
				})
		} else {
// render to views/web/list.ejs 
			res.render('web/list', {
				title: 'List All Data',
				data: rows
			})
		}
	})
	})
});
//delete data
app.delete('/delete/(:id)', function(req, res, next) {
	
	var user = { id: req.params.id }
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM parameter WHERE id = ' + req.params.id, user,function(err, result) {
			if (err) {
				req.flash('error', err)
// redirect to web list page
				res.redirect('/web/list')
			} else {
				req.flash('success', 'User deleted successfully! id = ' +req.params.id)
// redirect to web list page
				res.redirect('/web/list')
			}
		})
	})
});
//delete all data
app.delete('/delete', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM parameter', function(err, result) {
			if (err) {
				req.flash('error', err)
// redirect to web list page
				res.redirect('/web/list')
			} else {
				req.flash('success', 'User deleted successfully!')
// redirect to web list page
				res.redirect('/web/list')
			}
		})
	})
});
// post data form
app.get('/add', function(req, res, next){
	req.getConnection(function (error, conn){
		conn.query('SELECT * FROM parameter ORDER BY id DESC', function(err, rows, fieds){
			res.render('web/add',{
				title: 'Add New Data',
				longitude : '',
				latitude: '',
				temp: '',
				humid: ''
		})
		})
	})
});
// post data
app.post('/add', function(req, res, next){
	req.assert('longitude', 'longitude is required' ).notEmpty() 
	req.assert('latitude', 'latitude is required').notEmpty()
	req.assert('temp', 'temp is required').notEmpty()
	req.assert('humid', 'humid is required').notEmpty()
	var errors = req.validationErrors()
	if( !errors ) { 
		var	longitude = req.sanitize('longitude').escape().trim();
		var	latitude = req.sanitize('latitude').escape().trim();
		var	temp = req.sanitize('temp').escape().trim();
		var	humid = req.sanitize('humid').escape().trim();
			req.getConnection(function(error, conn) {
				conn.query('insert into parameter (longitude, latitude, temp, humid)'+
				'Select ?,?,?,?',[longitude,latitude,temp,humid], 
				function(err, result) {
					if (err) {
						req.flash('error', err)
						res.render('web/add', {
							title: 'Add New Data',
							longitude : '',
							latitude: '',
							temp: '',
							humid: ''
						})
					}else {
						req.flash('success', 'Data added successfully!')
						res.render('web/add', {
							title: 'Add New Data',
							longitude : '',
							latitude: '',
							temp: '',
							humid: ''
						})
					}
				})
			})
	}
	else {
		var error_msg = ''
			errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		res.render('web/add', {
			title: 'Add New Data',
			longitude: req.body.longitude,
			latitude: req.body.latitude,
			temp: req.body.temp,
			humid: req.body.humid
		})
	}
})
//display Map
app.get('/map', function(req, res, next){
	req.getConnection(function(error,conn) {
	conn.query('SELECT * FROM parameter ORDER BY id ASC',function(err, rows, fields) {
		if (err) {
			req.flash('error', err)
				res.render('web/map', {
					title: 'Google map',
					data: ''
				})
		} else {
// render to views/web/list.ejs 
			res.render('web/map', {
				title: 'Google map',
				data: rows
			})
		}
	})
	})
});

module.exports = app