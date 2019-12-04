import re
import numpy as np
import tensorflow as tf
#from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import load_model
#from collections import Counter
from tashaphyne.stemming import ArabicLightStemmer
#import os
#import glob


labels = ['تبرع بالدم', 'توظيف', 'دعوات', 'خدمات ولاد العم', 'احتياجات طبية', 'أدوية', 'مفقودات أشخاص وأشياء',
          'ملابس', 'الرفق بالحيوان', 'قصص ولاد العم', 'استفسارات عن أي موضوع', 'استشارات طبية', 'أعطال طرق', 'طلبات مساعدة',
          'احتياجات منزلية', 'مساعدة كبار السن', 'مساعدات تعليمية', 'توصيل', 'كتب'
         ]



def clean_str(text):
    search = ["أ","إ","آ","ة","-","/",".","،"," و "," يا ",'"',"ـ","'","ى","\\",'\n', '\t','&quot;','?','؟','!']
    replace = ["ا","ا","ا","ه"," "," "," "," "," و"," يا"," "," "," ","ي"," ",' ', ' ',' ',' ? ',' ؟ ',' ! ']

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


def predict_category(post_string, model_file='19_classes_7869.h5', w2idx_dict_file='1367_roots_w2idx.npy', max_rec=3, labels=labels):
    root_w2idx = np.load(w2idx_dict_file, allow_pickle=True).item()
    vocab_size = len(root_w2idx)
    model = load_model(model_file)
    features = np.zeros((1, vocab_size))
    clean_s = clean_str(post_string)
    ArListem = ArabicLightStemmer()
    for word in clean_s.split():
        root_flag = 0
        ArListem.light_stem(word)
        roots = [dic['root'] for dic in ArListem.get_affix_list()]
        for root in roots:
            if (root in root_w2idx.keys() and features[0, root_w2idx[root]] < max_rec):
                features[0, root_w2idx[root]] += 1
                root_flag = 1
                break;
        if(not root_flag and features[0, root_w2idx['<unk>']] < max_rec):
            features[0, root_w2idx['<unk>']] += 1

    prediction = model.predict(features)[0].argsort()[-2:][::-1]
    #print(prediction)

    if(prediction[0] == 3 and prediction[1] != 8):
    #if(3 in prediction):
        prediction = [labels[i] for i in prediction]
    else:
        prediction = labels[prediction[0]]

    return prediction


print(predict_category('عندي كتب ثانوية عامة للي محتاجهم'))
print(predict_category('لو في دكتور عظام يطمني على نتيجة الاشعة'))
