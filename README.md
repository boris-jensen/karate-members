**Todo:**

Seasons
Datepicker for dates
Pictures of students
Multiple parents control multiple students. Admin creates user and signup
Users admin page
Publish users for admin


**TO SETUP DEPLOYMENT:**

Follow this guide: https://medium.com/nona-web/deploying-and-hosting-meteor-on-heroku-mongolab-for-free-37050a3ebd7e
set MONGO_URL as mongodb://boris:hikitehikiashi@ds029635.mlab.com:29635/esbjerg-karate-members-db
also set MAIL_URL as smtp://esbjerg.karate.members:hikitehikiashi@smtp.gmail.com:465/

Can use this buildpack, already configured: https://github.com/boris-jensen/meteor-buildpack-horse
Heroku dashboard for the applicaton: https://dashboard.heroku.com/apps/karate-members/

mlab account: https://mlab.com/home, boris_jensen/...

If you want to redirect eg. members.esbjerg-karate.dk to the new app, see https://devcenter.heroku.com/articles/custom-domains


**TO DEPLOY**

git push heroku master
