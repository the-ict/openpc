"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get_sessions, create_session, add_model_to_session } from "@/src/shared/config/api/session/session.requests";
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

    const addModelMutation = useMutation({
        mutationKey: ["add_model_to_session"],
        mutationFn: ({ sessionId, modelId }: { sessionId: string; modelId: string }) =>
            add_model_to_session(sessionId, modelId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
            toast.success("Model qo'shildi");
        },
        onError: () => {
            toast.error("Model qo'shishda xatolik");
        },
    });

    return {
        data: sessionsData,
        error: sessionsError,
        loading,
        token,
        createSession: createSessionMutation.mutate,
        isCreatingSession: createSessionMutation.isPending,
        addModel: addModelMutation.mutate,
        isAddingModel: addModelMutation.isPending,
    };
};
