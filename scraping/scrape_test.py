import tweepy
import json
import time
from datetime import datetime, timezone

# Twitter API credentials
BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAJeU0QEAAAAAqbtgnHKgb8vWgSxXVr4S8QeQPtQ%3DCcIFOJr09EJLQCzvJxvfrlj4kQn1dGEkvFPoH5IY1sKpgcXi2Z"  # Replace with your actual Twitter API v2 Bearer Token

# Initialize Tweepy Client
client = tweepy.Client(bearer_token=BEARER_TOKEN, wait_on_rate_limit=True)

# Search query
SEARCH_NAME = "trump"  # Change this as needed
QUERY = f'"{SEARCH_NAME}" -is:retweet lang:en'

# Event details
event_id = "12345"
event_name = "Indian tarifff 2025"

# Fetch tweets function
def fetch_tweets_for_model(query, max_results=50):
    tweets_data = []

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
                    "timestamp": datetime.now(timezone.utc).isoformat(),  # When we scraped it
                }

                tweets_data.append(tweet_input)

            print(f"✅ Extracted {len(tweets_data)} tweets.")

        time.sleep(90)  # Be nice to the API

    except tweepy.TooManyRequests:
        print("⚠️ Rate limit hit. Waiting for 15 minutes...")
        time.sleep(15 * 60)
        return fetch_tweets_for_model(query, max_results)

    except Exception as e:
        print(f"❌ Error: {e}")
    
    return tweets_data

# Run and print
tweets = fetch_tweets_for_model(QUERY)
print(json.dumps(tweets, indent=4))
