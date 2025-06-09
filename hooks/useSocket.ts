'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner'; // atau pakai Toast dari shadcn/ui

export function useNotificationSocket() {
  const socketRef = useRef<Socket | null>(null);
  const { data: session } = useSession(); // ambil userId dari session (atau auth store kamu)

  useEffect(() => {
    if (!session?.user?.id) return;

    const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
      transports: ['websocket'],
      query: {
        userId: session.user.id, // kirim userId sebagai query param
      }
    });

    // 🟢 Berhasil connect ke server
    socket.on('connect', () => {
      console.log('🟢 Socket connected:', socket.id);
    });

    // 🔌 Disconnect / error
    socket.on('disconnect', () => {
      console.warn('🔌 Socket disconnected');
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message);
    });

    // 📝 Register user ke server
    socket.emit('register', session.user.id);

    // 🔔 Listen notifikasi
    socket.on('new-notification', (notif) => {
      console.log('📥 Notifikasi masuk:', notif);
      toast(notif.title, {
        description: notif.body,
      });
    });



    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [session?.user?.id]);


  return socketRef.current;
}
