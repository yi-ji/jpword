from pymongo import *
import random,threading

lock = threading.Lock()

class DB:
	def __init__(self):
		self.DBNAME = 'jpwordapp'
		self.conn = MongoClient('localhost',27017)
		self.db = self.conn[self.DBNAME]
		self.MEM_TIME = 10
		self.FORGET_PUNISH = 2
		self.speed = 0.2

	def register(self,username,password):
		if (username == '' or password == ''):
			return False
		users = self.db['users']
		if (users.find({'username':username}).count() == 0):
			users.insert({'username':username,'password':password,'finished':0})
			return True
		else:
			return False

	def login(self,username,password):
		if (username == '' or password == ''):
			return False
		users = self.db['users']
		if (self.db.users.find({'username':username,'password':password}).count() > 0):
			return True
		else:
			return False

	def remember(self,username,word):
		form = self.db[username]
		if (form.find({'word':word}).count() == 0):
			form.insert({'word':word,'progress':1})
		else:
			info = form.find_one({'word':word})
			if (info['progress'] >= self.MEM_TIME):
				form.remove({'word':word})
			else:
				form.update({'word':word},{'$set':{'progress':info['progress']+1}})

	def forget(self,username,word):
		form = self.db[username]
		if (form.find({'word':word}).count() > 0):
			info = form.find_one({'word':word})
			if (info['progress'] >= self.FORGET_PUNISH):
				form.update({'word':word},{'$set':{'progress':info['progress']-self.FORGET_PUNISH}})
			else:
				form.update({'word':word},{'$set':{'progress':0}})

	def set_word(self,username,word,progress):
		form = self.db[username]
		if (progress == self.MEM_TIME):
			self.done_with_word(username,word)
			return
		if (form.find({'word':word}).count() > 0):
			form.update({'word':word},{'$set':{'progress':progress}})
		else:
			form.insert({'word':word,'progress':progress})

	def get_word_new(self,username):
		try:
			next_new = self.db['users'].find_one({'username':username})['finished']+1
			self.db['users'].update({'username':username},{'$set':{'finished':next_new}})
			result = self.db['words'].find_one({'number':next_new})
			result['progress'] = 0
			return result
		except:
			return {'word':'All Done!','pronoun':'','meaning':'Congratulation, you have finished!','tune':'','progress':self.MEM_TIME,"_id":''}

	def get_word_old(self,username):
		candidates = self.db[username].find()
		try:
			word = candidates[random.randint(0,max(candidates.count()-1,0))]['word']
			result = self.db['words'].find_one({'word':word})
			result['progress'] = self.db[username].find_one({'word':result['word']})['progress']
			return result
		except:
			return None

	def get_word(self,username,display):
		lock.acquire()
		if (random.randint(0,100)/100.0 < self.speed):
			result = self.get_word_new(username)
			if (result == None):
				result = self.get_word_old(username)
			#print(result)
		else:
			result = self.get_word_old(username)
			if (result == None or result['word'] in display):
				result = self.get_word_new(username)
		lock.release()
		del result["_id"]
		#print username,result
		return result

	def done_with_word(self,username,word):
		self.db[username].remove({'word':word})

# testdb = DB()
# # testdb.register("jiyi","12345678")
# # testdb.remember("jiyi","testword")
# # testdb.remember("jiyi","testword")
# # testdb.remember("jiyi","testword")
# # testdb.remember("jiyi","testword")
# # testdb.forget("jiyi","testword")
# # testdb.forget("jiyi","testword2")
# for i in range(0,30):
# 	print testdb.get_word("jiyi")
