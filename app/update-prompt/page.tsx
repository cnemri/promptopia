"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const router = useRouter();

  const promptId = searchParams.get("id");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost(data);
    };
    if (promptId) fetchPost();
  }, [promptId]);

  const updatePrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
