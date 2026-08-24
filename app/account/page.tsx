"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Check, KeyRound, ShieldAlert, User } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useAuth } from "@/features/auth/AuthContext";
import {
  AuthApiError,
  changePassword,
  updateProfile,
} from "@/features/auth/api";

export default function AccountPage() {
  const { user, token, loading: authLoading, setUser } = useAuth();

  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [profileErrors, setProfileErrors] = useState<Record<string, string[]>>({});
  const [profileMessage, setProfileMessage] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string[]>>({});
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    setProfileForm({
      first_name: user.first_name,
      last_name: user.last_name ?? "",
      phone: user.phone ?? "",
    });
  }, [user]);

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();

    if (!token) return;

    setProfileSaving(true);
    setProfileErrors({});
    setProfileMessage("");

    try {
      const updated = await updateProfile(token, {
        first_name: profileForm.first_name,
        last_name: profileForm.last_name || undefined,
        phone: profileForm.phone || undefined,
      });

      setUser(updated);
      setProfileMessage("Profile updated.");
    } catch (err) {
      if (err instanceof AuthApiError) {
        setProfileErrors(err.errors);
      }
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();

    if (!token) return;

    setPasswordSaving(true);
    setPasswordErrors({});
    setPasswordMessage("");

    try {
      await changePassword(token, passwordForm);

      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
      setPasswordMessage("Password changed.");
    } catch (err) {
      if (err instanceof AuthApiError) {
        setPasswordErrors(err.errors);
      }
    } finally {
      setPasswordSaving(false);
    }
  }

  if (authLoading) {
    return (
      <section className="bg-ivory py-24">
        <Container className="max-w-lg text-center text-obsidian/50">
          Loading...
        </Container>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-ivory py-24">
        <Container className="max-w-lg">
          <div className="rounded-xl border border-border bg-white p-10 text-center shadow-sm">
            <ShieldAlert className="mx-auto mb-4 text-sapphire" size={48} />

            <h1 className="text-2xl font-bold">Sign In Required</h1>

            <p className="mt-3 text-obsidian/50">
              Sign in to manage your account.
            </p>

            <Link href="/login">
              <AppButton className="mt-8 w-full">Sign In</AppButton>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-12">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-obsidian">Account Settings</h1>
        <p className="mt-1 text-sm text-obsidian/50">
          Manage your profile and password.
        </p>

        {/* Profile form */}
        <form
          onSubmit={handleProfileSubmit}
          className="mt-8 rounded-xl border border-border bg-white p-6"
        >
          <div className="flex items-center gap-2.5">
            <User className="h-5 w-5 text-sapphire" />
            <h2 className="text-lg font-bold text-obsidian">Profile</h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-obsidian/70">
                First Name *
              </label>
              <input
                required
                value={profileForm.first_name}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, first_name: e.target.value }))
                }
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-sapphire"
              />
              {profileErrors.first_name && (
                <p className="mt-1 text-xs text-red-600">
                  {profileErrors.first_name[0]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-obsidian/70">
                Last Name
              </label>
              <input
                value={profileForm.last_name}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, last_name: e.target.value }))
                }
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-sapphire"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-obsidian/70">
                Phone
              </label>
              <input
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-sapphire"
              />
              {profileErrors.phone && (
                <p className="mt-1 text-xs text-red-600">{profileErrors.phone[0]}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-obsidian/70">
                Email
              </label>
              <input
                disabled
                value={user.email}
                className="w-full rounded-xl border border-border bg-muted px-4 py-2.5 text-sm text-obsidian/50 outline-none"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <AppButton type="submit" disabled={profileSaving}>
              {profileSaving ? "Saving..." : "Save Profile"}
            </AppButton>

            {profileMessage && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
                <Check className="h-4 w-4" />
                {profileMessage}
              </span>
            )}
          </div>
        </form>

        {/* Password form */}
        <form
          onSubmit={handlePasswordSubmit}
          className="mt-6 rounded-xl border border-border bg-white p-6"
        >
          <div className="flex items-center gap-2.5">
            <KeyRound className="h-5 w-5 text-sapphire" />
            <h2 className="text-lg font-bold text-obsidian">Change Password</h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-obsidian/70">
                Current Password *
              </label>
              <input
                required
                type="password"
                value={passwordForm.current_password}
                onChange={(e) =>
                  setPasswordForm((f) => ({
                    ...f,
                    current_password: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-sapphire"
              />
              {passwordErrors.current_password && (
                <p className="mt-1 text-xs text-red-600">
                  {passwordErrors.current_password[0]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-obsidian/70">
                New Password *
              </label>
              <input
                required
                type="password"
                minLength={8}
                value={passwordForm.password}
                onChange={(e) =>
                  setPasswordForm((f) => ({ ...f, password: e.target.value }))
                }
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-sapphire"
              />
              {passwordErrors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {passwordErrors.password[0]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-obsidian/70">
                Confirm New Password *
              </label>
              <input
                required
                type="password"
                minLength={8}
                value={passwordForm.password_confirmation}
                onChange={(e) =>
                  setPasswordForm((f) => ({
                    ...f,
                    password_confirmation: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-sapphire"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <AppButton type="submit" disabled={passwordSaving}>
              {passwordSaving ? "Changing..." : "Change Password"}
            </AppButton>

            {passwordMessage && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
                <Check className="h-4 w-4" />
                {passwordMessage}
              </span>
            )}
          </div>
        </form>
      </Container>
    </section>
  );
}
