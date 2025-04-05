import tweepy
import json
import time
from datetime import datetime, timezone
import itertools
from tweepy.errors import TooManyRequests

# List of Twitter API bearer tokens (rotate on limit)
BEARER_TOKENS = [
    "AAAAAAAAAAAAAAAAAAAAACaS0QEAAAAAI3ZWqnuyEoL7OE5mpWG3XMwxsB0%3DA2uun794wBAOWNlknsLZVnfO9zJ2w8GOu8pk86XeMjFeMG7ldF",
    "AAAAAAAAAAAAAAAAAAAAAJeU0QEAAAAAqbtgnHKgb8vWgSxXVr4S8QeQPtQ%3DCcIFOJr09EJLQCzvJxvfrlj4kQn1dGEkvFPoH5IY1sKpgcXi2Z"
]

# Create a cycling token iterator
token_cycle = itertools.cycle(BEARER_TOKENS)

def get_next_client():
    token = next(token_cycle)
    print(f"🔁 Switching to bearer token: {token[:10]}...")  # Log partially for debug
    return tweepy.Client(bearer_token=token, wait_on_rate_limit=False)

# Search query
SEARCH_NAME = "Elon Musk"
QUERY = f'"{SEARCH_NAME}" -is:retweet lang:en'

# Event details
event_id = "12345"
event_name = "AI Conference 2025"

def fetch_tweets_for_model(query, max_results=10):
    tweets_data = []
    client = get_next_client()

    for attempt in range(len(BEARER_TOKENS) * 2):  # Retry limit
        try:
            response = client.search_recent_tweets(
                query=query,
                tweet_fields=["id", "text", "created_at", "author_id"],
                user_fields=["username"],
                expansions=["author_id"],
                max_results=max_results,
            )

            if response.data:
                users = {user.id: user for user in response.includes["users"]} if response.includes else {}

                for tweet in response.data:
                    author = users.get(tweet.author_id, {})

                    tweet_input = {
                        "text": tweet.text,
                        "eventId": event_id,
                        "eventName": event_name,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    }

                    tweets_data.append(tweet_input)

                print(f"✅ Extracted {len(tweets_data)} tweets.")
            break  # Success

        except TooManyRequests:
            print("⚠️ Rate limit hit. Rotating token...")
            client = get_next_client()
            time.sleep(5)
        except Exception as e:
            print(f"❌ Error: {e}")
            break

    return tweets_data

# Run and print
tweets = fetch_tweets_for_model(QUERY)
print(json.dumps(tweets, indent=4))
