import logging

from apscheduler.schedulers.blocking import BlockingScheduler
from posts.repository import get_group_posts_from_fb


sched = BlockingScheduler()

@sched.scheduled_job('interval', minutes=30)
def fetch_new_posts():
    succeeded, posts_count = get_group_posts_from_fb()
    if succeeded:
        logging.info({"message": "done", "posts_count": posts_count})
    else:
        logging.error({"message": "error calling Facbook API"})


sched.start()
