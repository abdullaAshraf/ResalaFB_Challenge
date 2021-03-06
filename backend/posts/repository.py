import logging
import os
from categorization.predict import predict_category

import time
import json
import requests
import logging


from .models import Post, Category, Configration

from typing import Tuple


access_token= os.environ.get("access_token")
group_id="1484691605005106"
one_day = 60 * 60 * 24

def save_post(post):
    category = predict_category(post.get("message", ""))
    category = Category.objects.get(name=category)
    
    p = Post(
        message=post.get("message", ""), permalink_url=post["permalink_url"],
        created_time=post["created_time"], updated_time=post["updated_time"],
        category=category, alt_text=post.get("alt_text", "")
    )
    p.save()

def get_group_posts_from_fb() -> Tuple[bool, int]:
    """
    Call the facebook graph API to get the latest posts

    response : succeeded: bool, posts_count: int
    """
    last_run = Configration.objects.get(key="last_run")
    since = int(last_run.value)
    until = int(time.time())
    limit = 5
    fields="id,message,created_time,updated_time,from,is_hidden,permalink_url,object_id"

    posts_count = 0

    request_url= (f"https://graph.facebook.com/{group_id}/feed/?fields={fields}"
            f"&since={since}&until={until}&limit={limit}"
            f"&access_token={access_token}")

    while request_url:
        logging.info(f"request_url = {request_url}")

        response = requests.get(request_url)
        payload = json.loads(response.content)

        if not response.status_code == 200:
            logging.error(payload)
            return False, posts_count

        data = payload["data"]
        posts_count += len(data)

        for post in data:
            if post.get('object_id'):
                photo_id=post.get('object_id')
                photo_request_url= (f"https://graph.facebook.com/{photo_id}/?fields=alt_text"
                    f"&access_token={access_token}")
                logging.info(f"photo_request_url = {photo_request_url}")
                response = requests.get(photo_request_url)
                payload = json.loads(response.content)
                post["alt_text"] = payload["alt_text"]
            save_post(post)
        
        # get the next page
        request_url = payload.get("paging", {}).get("next")
        

    last_run.value=until
    last_run.save()
    return True, posts_count
