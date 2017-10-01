import pytils
from django import template
from news.models import Articles
register = template.Library()


def show_articles_list(page=0):
    try:
        news_list = Articles.objects.filter(is_draft=False).order_by("-date")[:6]
        for n in news_list:
            n.date = pytils.dt.ru_strftime(u"%d %B %Y", inflected=True, date=n.date)
    except:
        msg = 'Roottype not found '
        raise template.TemplateSyntaxError(msg)
    if page:
        page_url = "index"
    else:
        page_url = ""
    return {'news_list': news_list, "page_url": page_url}

register.inclusion_tag('inc_articles_list_index.html')(show_articles_list)
