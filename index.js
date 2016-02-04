var fs = require("fs");
var _ = require('lodash')
var Handlebars = require("handlebars");

function render(resume) {
	if (resume.basics && resume.basics.profiles.length > 0) {
		for (var i=0; i < resume.basics.profiles.length; i++) {
			resume.basics.profiles[i].class = resume.basics.profiles[i].network.toLowerCase();
		}
	}
	_.each(resumeObject.work, function(w){
		w.startDateYear = w.startDate.substr(0,4);
		if(w.endDate) {
			w.endDateYear = w.endDate.substr(0,4);
		} else {
			w.endDateYear = 'Present'
		}
	});
	_.each(resumeObject.volunteer, function(v){
		v.startDateYear = v.startDate.substr(0,4);
		if(v.endDate) {
			v.endDateYear = v.endDate.substr(0,4);
		} else {
			v.endDateYear = 'Present'
		}
	});
	_.each(resumeObject.education, function(e){
		if( !e.area || !e.studyType ){
			e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
		}  else {
			e.educationDetail = e.area + " ("+ e.studyType + ")";
		}
		e.startDateYear = e.startDate.substr(0,4);
		if(e.endDate) {
			e.endDateYear = e.endDate.substr(0,4);
		}  else {
			e.endDateYear = 'Present'
		}
	});

	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var template = fs.readFileSync(__dirname + "/resume.template", "utf-8");
	return Handlebars.compile(template)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};