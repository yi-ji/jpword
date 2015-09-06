# encoding: utf-8
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.template.loader import render_to_string
from django.shortcuts import render_to_response
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django import forms
import dbutils
import json

db = dbutils.DB()
MIN_PASSWD_LEN = 6

@csrf_protect
def home(request):
	token = {}
	token.update(csrf(request))
	return HttpResponse(render_to_string('index.html',{'token':token['csrf_token']}))

def init_session(request):
	request.session['display'] = []
	request.session['current_word'] = ''
	request.session['hehe'] = [1,2,3]
	request.session.set_expiry(0)

@csrf_protect
def register(request):
	info = request.POST
	username = info['username']
	password = info['password']
	if (len(password) < MIN_PASSWD_LEN):
		return HttpResponse('{"ok":0,"msg":"The password is too short. Minimum length is' +str(MIN_PASSWD_LEN)+ '."}')
	if (db.register(username,password)):
		init_session(request)
		request.session['username'] = username
		return HttpResponse('{"ok":1,"msg":"Register success!"}')
	else:
		return HttpResponse('{"ok":0,"msg":"Username already exists."}')

@csrf_protect
def login(request):
	info = request.POST
	username = info['username']
	password = info['password']
	if (db.login(username,password)):
		init_session(request)
		request.session['username'] = username
		return HttpResponse('{"ok":1,"msg":"Login success!"}')
	else:
		return HttpResponse('{"ok":0,"msg":"Wrong username/password."}')

def remember(request):
	info = request.POST
	username = request.session['username']
	word = info['word']
	db.remember(username,word)

def forget(request):
	info = request.POST
	username = request.session['username']
	word = info['word']
	db.forget(username,word)

@csrf_protect
def set_word(request):
	info = request.POST.get('model')
	info = json.loads(info)
	#word = info.get('word')
	#progress = info.get('progress')
	word = info['word']
	progress = info['progress']
	username = request.session['username']
	request.session['current_word'] = word
	db.set_word(username,word,progress)
	return JsonResponse({}, safe=False)

@csrf_protect
def get_word(request):
	if (len(request.GET) > 0):
		return get_words(request)
	username = request.session['username']
	display = request.session['display']
	result = db.get_word(username,display)
	display.append(result['word'])
	if (request.session['current_word'] in display):
		display.remove(request.session['current_word'])
	# print request.session['current_word']
	# print "---"
	# for ele in display:
	# 	print ele
	request.session['hehe'] = [4,5,6]
	return JsonResponse(result, safe=False)

@csrf_protect
def get_words(request):
	info = request.GET
	num = int(info['num'])
	username = request.session['username']
	display = request.session['display']
	results = []
	for i in range(0,num):
		result = db.get_word(username,display)
		display.append(result['word'])
		if (request.session['current_word'] in display):
			display.remove(request.session['current_word'])
		results.append(result)
	# print request.session['current_word']
	# print "---"
	# for ele in display:
	# 	print ele
	request.session['hehe'] = [4,5,6]
	print(results)
	return JsonResponse(results, safe=False)

def test(request):
	return HttpResponse("testing")
