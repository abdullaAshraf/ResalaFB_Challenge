# -*- coding: utf8 -*-
import os
import numpy as np
import tensorflow as tf
import re
from tensorflow.keras.models import load_model

def clean_str(text):
    search = ["أ","إ","آ","ة","-","/",".","،"," و "," يا ",'"',"ـ","'","ى","\\",'\n', '\t','&quot;','?','؟','!']
    replace = ["ا","ا","ا","ه"," ","","",""," و"," يا","","","","ي","",' ', ' ',' ',' ? ',' ؟ ',' ! ']

    #remove tashkeel
    p_tashkeel = re.compile(r'[\u0617-\u061A\u064B-\u0652]')
    text = re.sub(p_tashkeel,"", text)

    #remove longation
    p_longation = re.compile(r'(.)\1+')
    subst = r"\1\1"
    text = re.sub(p_longation, subst, text)

    text = text.replace('وو', 'و')
    text = text.replace('يي', 'ي')
    text = text.replace('اا', 'ا')

    for i in range(0, len(search)):
        text = text.replace(search[i], replace[i])

    #trim
    text = text.strip()

    return text


def prediction(post):
    labels = ['blood', 'jobs', 'prays', 'services', 'medical needs', 'medics', 'missings', 'clothes']
    model = load_model(os.path.dirname(os.path.realpath(__file__))+'/Model.h5')
    features = np.zeros((1, 260))
    word2index = np.load(os.path.dirname(os.path.realpath(__file__))+'/word2index.npy',
        allow_pickle=True).item()
    for word in post.split():
        if word in word2index.keys():
            features[0, word2index[word]] += 1
    result = labels[np.argmax(model.predict(features), 1)[0]]
    return result


def predict_category(post_content: str) -> str:
	content_cleaned = clean_str(post_content)
	category = prediction(content_cleaned)
	return category
