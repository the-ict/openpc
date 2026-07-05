"use client";

import { get_sessions, create_session, delete_session, update_session } from "@/src/shared/config/api/session/session.requests";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import user_store from "@/src/shared/store/user.store";
import { toast } from "sonner";

export const useSession = () => {
    const { token } = user_store.getState();
    const queryClient = useQueryClient();

    const { data: sessionsData, error: sessionsError, isFetching } = useQuery({
        queryKey: ["sessions"],
        queryFn: get_sessions,
    });

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

    const deleteSessionMutation = useMutation({
        mutationKey: ["delete_session"],
        mutationFn: (id: string) => delete_session(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
            toast.success("Sessiya o&apos;chirildi");
        },
        onError: () => {
            toast.error("Sessiya o&apos;chirishda xatolik");
        },
    });

    const updateSessionMutation = useMutation({
        mutationKey: ["update_session"],
        mutationFn: ({ id, data }: { id: string; data: { name: string } }) => update_session(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
            toast.success("Sessiya yangilandi");
        },
        onError: () => {
            toast.error("Sessiya yangilashda xatolik");
        },
    });
    return {
        data: sessionsData,
        error: sessionsError,
        loading: isFetching,
        token,
        createSession: createSessionMutation.mutate,
        isCreatingSession: createSessionMutation.isPending,
        deleteSession: deleteSessionMutation.mutate,
        isDeletingSession: deleteSessionMutation.isPending,
        updateSession: updateSessionMutation.mutate,
        isUpdatingSession: updateSessionMutation.isPending,
    };
};
