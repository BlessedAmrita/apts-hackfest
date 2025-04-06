"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Send, Users } from "lucide-react";

const CommunityForumMain = ({ eventId }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const { user } = useAuth(); // 🔥 Get logged-in user
  
  console.log("🟢 eventId in CommunityForumMain:", eventId);

  // ✅ Firestore Real-Time Listener for Posts
  useEffect(() => {
    if (!eventId) return;

    const q = query(
      collection(db, `events/${eventId}/posts`),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, [eventId]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !user) return;

    const newPostData = {
      uid: user.uid,
      author: user.displayName || "Anonymous",
      text: newPost,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, `events/${eventId}/posts`), newPostData);
    setNewPost(""); // Reset input field
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Community Discussion</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-5 w-5 text-event-yellow" />
            <span className="font-medium">{posts.length} Participants</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* 💬 POST INPUT FORM */}
            <Card className="mb-6 border-event-light-yellow">
              <CardContent className="pt-6">
                <form onSubmit={handlePostSubmit}>
                  <Textarea
                    placeholder="Share your thoughts about the event..."
                    className="min-h-24 mb-4 border-gray-200 focus:border-event-yellow"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-event-yellow hover:bg-yellow-500 text-black flex gap-2"
                    >
                      Post <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* 🔥 DYNAMIC POSTS */}
            {posts.map((post) => (
              <Card key={post.id} className="mb-4 shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 bg-event-light-yellow text-gray-700">
                      <AvatarFallback>{post.author?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{post.author}</h3>
                        <span className="text-gray-500 text-sm">
                          {post.timestamp?.toDate().toLocaleString() || "Just now"}
                        </span>
                      </div>
                      <p className="text-gray-700">{post.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 📜 Forum Guidelines */}
          <div>
            <Card className="sticky top-4">
              <CardHeader className="bg-event-light-yellow rounded-t-lg pb-4">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-event-yellow" />
                  Forum Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• Be respectful and courteous to fellow attendees</li>
                  <li>• Stay on topic related to the event</li>
                  <li>• No spamming or promotional content</li>
                  <li>• Share your experiences and ask questions</li>
                  <li>• Report any inappropriate content</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityForumMain;
