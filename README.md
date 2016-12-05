# **Queri**
###(A React-native project)

##Spin-up steps

1. Make sure mongo instance is running
	* run <code>mongod</code> then <code>mongo</code> *(in separate windows)*
	* test if running in mongoshell
2. Start up Backend *(local server)*
	* cd to <code> Back_End</code> directory
    * run <code>nodemon</code> or <code>node app.js</code>
3. Start up React-native app
	* cd to main directory
	* run <code>react-native run-ios</code> or <code>react-native run-android</code>

###Back-End
  function|
  --------|
  objects to be passed in JSON|


  register | login | addQuestion|vote|
  ---------|-------|------------|---
  username, password , email | username, password | username, question, optionA, optionB| username, LorR|



###Front-End

###Dependencies
  * nodemon _(for workflow management: install globally)_
  * Express :train:
  * chai  :tea:  _(For unit testing: install locally)_
  * mocha :coffee:  _(For unit testing: install globally)_
  * jade  
  * mongoose :koala:
