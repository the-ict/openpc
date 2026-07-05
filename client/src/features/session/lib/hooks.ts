"use client";

import { get_sessions, create_session } from "@/src/shared/config/api/session/session.requests";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import user_store from "@/src/shared/store/user.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useSession = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = user_store.getState();
    const queryClient = useQueryClient();

    const { data: sessionsData, error: sessionsError } = useQuery({
        queryKey: ["sessions"],
        queryFn: get_sessions,
    });

    useEffect(() => {
        if (sessionsData !== undefined) {
            setLoading(false);
        }
    }, [sessionsData]);

    const createSessionMutation = useMutation({
        mutationKey: ["create_session"],
        mutationFn: (name: string) => create_session({ name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
            toast.success("Sessiya yaratildi");
        },
        onError: () => {
            toast.error("Sessiya yaratishda xatolik");
        },
    });

    return {
        data: sessionsData,
        error: sessionsError,
        loading,
        token,
        createSession: createSessionMutation.mutate,
        isCreatingSession: createSessionMutation.isPending,
    };
};
