import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

export interface ChannelProps {
  id: number;
  slug: string;
}

export interface MessageProps {
  id: number;
  message: string;
  user_id: string;
  channel_id: number;
  inserted_at: Date;
  author: {
    id: string;
    username: string;
  };
}

/**
 * @param {number} channelId the currently selected Channel
 */
export const useStore = (props: { channelId: number }) => {
  const [channels, setChannels] = useState<Array<ChannelProps>>([]);
  const [messages, setMessages] = useState<Array<MessageProps>>([]);
  const [users] = useState(new Map());
  const [newMessage, handleNewMessage] = useState<any>(null);
  const [newChannel, handleNewChannel] = useState<any>(null);
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState<any>(null);
  const [deletedChannel, handleDeletedChannel] = useState<any>(null);
  const [deletedMessage, handleDeletedMessage] = useState(null);

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    fetchChannels(setChannels);

    // Listen for new and deleted channels
    const channelListener = supabase
      .channel("public:channels")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "channels" },
        (payload) => handleNewChannel(payload.new)
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "channels" },
        (payload) => handleDeletedChannel(payload.old)
      )
      .subscribe();

    // Listen for new messages
    const messageListener = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => handleNewMessage(payload.new)
      )
      .subscribe();

    const userListener = supabase
      .channel("public:users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        (payload) => handleNewOrUpdatedUser(payload.new)
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(messageListener);
      supabase.removeChannel(userListener);
      supabase.removeChannel(channelListener);
    };
  }, []);

  // Update when the route changes
  useEffect(() => {
    if (props?.channelId > 0) {
      fetchMessages(props.channelId, (messages: MessageProps[]) => {
        setMessages(messages);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.channelId]);

  // New message received from Postgres
  useEffect(() => {
    if (newMessage && newMessage.channel_id === Number(props.channelId)) {
      const handleAsync = async () => {
        try {
          let authorId = newMessage.user_id;

          if (!users.get(authorId)) {
            const author = await fetchUser(authorId);
            users.set(authorId, author);
          }
          newMessage.author = users.get(authorId);
          setMessages(messages.concat(newMessage));
        } catch (error) {
          console.error(error);
        }
      };
      handleAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  // New channel received from Postgres
  useEffect(() => {
    if (newChannel) setChannels(channels.concat(newChannel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChannel]);

  // Deleted channel received from postgres
  useEffect(() => {
    if (deletedChannel)
      setChannels(
        channels.filter((channel) => channel.id !== deletedChannel.id)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedChannel]);

  return {
    // We can export computed values here to map the authors to each message
    messages: messages,
    channels: (channels !== null
      ? channels.sort((a, b) => a.slug.localeCompare(b.slug))
      : []) as ChannelProps[],
    users,
  };
};

/**
 * Fetch all channels
 * @param {function} callback Optionally pass in a hook or callback to set the state
 */

export const fetchChannels = async (callback: any) => {
  try {
    let { data } = await supabase.from("channels").select("*");
    if (callback) callback(data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} callback Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (channelId: number, callback: any) => {
  try {
    let { data } = await supabase
      .from("messages")
      .select(`*, author:user_id(*)`)
      .eq("channel_id", channelId)
      .order("inserted_at", { ascending: true });
    if (callback) callback(data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addMessage = async (
  message: string,
  channel_id: number,
  user_id: string
) => {
  try {
    let { data } = await supabase
      .from("messages")
      .insert([{ message, channel_id, user_id }])
      .select();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

/**
 * Fetch a single user
 * @param {number} userId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUser = async (userId: string, setState?: any) => {
  try {
    let { data } = await supabase.from("users").select(`*`).eq("id", userId);
    let user = data ? data[0] : null;
    if (setState) setState(user);
    return user;
  } catch (error) {
    console.error("error", error);
  }
};
