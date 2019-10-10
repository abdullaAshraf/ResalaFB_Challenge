import logging
import os, sys
sys.path.append(os.path.dirname(sys.path[0]))
from categorization.predict import predict_category

import time
import json
import requests
import logging


from .models import Post, Category, Configration

from typing import Tuple


access_token="EAAHxtOXZA7ZB4BAMRToqpLAHmibdBY9OFHLbub9ZA9I0eYzhJm0hSHNeUJi8qsTbP9AdDTcooDBrAth9Mi40VZAZAUMh7ZCzI2fttm03Gv3WVtZA6zFs1Rddbh2oNeAHcNqhLpX0HN5sA4IqvjP4lHAUQO4urZAevH9iwRgZBIa9ZA96bxRszmaJsINtZCsl8ic8QQZD"
group_id="1484691605005106"
one_day = 60 * 60 * 24

def save_post(post):
    category = predict_category(post.get("message", ""))
    category = Category.objects.get(name=category)
    
    p = Post(
        message=post.get("message", ""), permalink_url=post["permalink_url"],
        created_time=post["created_time"], updated_time=post["updated_time"],
        category=category,
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
    fields="id,message,created_time,updated_time,from,is_hidden,permalink_url"

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
            save_post(post)
        
        # get the next page
        request_url = payload.get("paging", {}).get("next")
        

    last_run.value=until
    last_run.save()
    return True, posts_count
