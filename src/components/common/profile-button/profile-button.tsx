// Import the necessary functions from redux store or wherever they are defined
import { useAppSelector } from "@/lib/redux/store";
import {useEffect, useState} from "react";

export default function ProfileButton() {
    // Use the useSelector hook to get the user state from redux store
    const user = useAppSelector(state => state.user.user);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar text-black">
                <div className="w-10 rounded-full">
                    <div className="skeleton rounded-full w-10 h-10"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="dropdown dropdown-end text-white">
            <div tabIndex={0} role="button" className="btn btn-ghost w-fit m-0 p-0 pl-0 md:pl-2 rounded-full">
                <div className="rounded-full flex flex-row justify-center items-center gap-4">
                    <div className="hidden md:block">
                        <p className="font-bold text-lg">{user?._id ? user.nick : "Login"}</p>
                    </div>
                    <img
                        width={40}
                        height={40}
                        alt="Avatar"
                        className="rounded-full"
                        src={user?.avatar?.length ? user?.avatar : "/assets/icons/logo_clear.png"}
                    />
                </div>
            </div>

            {/* Conditional rendering based on user presence */}
            {user?._id ? (
                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 glass bg-base-300">
                    <li>
                        <a href="/profile/me/1" className="justify-between">
                            <div className="flex flex-wrap gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="size-5"
                                >
                                    <path
                                        d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"/>
                                </svg>
                                Profile
                            </div>
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li>
                        <a href="/profile/me/wallet">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path
                                    d="M1 4.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 2H3.25A2.25 2.25 0 0 0 1 4.25ZM1 7.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 5H3.25A2.25 2.25 0 0 0 1 7.25ZM7 8a1 1 0 0 1 1 1 2 2 0 1 0 4 0 1 1 0 0 1 1-1h3.75A2.25 2.25 0 0 1 19 10.25v5.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75v-5.5A2.25 2.25 0 0 1 3.25 8H7Z"/>
                            </svg>
                            Wallet
                        </a>
                    </li>
                    <li>
                        <a href="/profile/me/notifications/new/1" className="justify-between">
                            <div className="flex flex-wrap gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="size-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Notifications
                            </div>
                            <span className="badge">10</span>
                        </a>
                    </li>
                    <li>
                        <a href="/profile/me/edit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Edit profile
                        </a>
                    </li>
                    <li>
                        <a href="/profile/me/saved/1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Saved posts
                        </a>
                    </li>
                    <li>
                        <a href="/support">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Support
                        </a>
                    </li>
                    <li>
                        <a href="/logout">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Logout
                        </a>
                    </li>
                </ul>
            ) : (
                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 glass bg-base-300">
                    <li>
                        <a href="/support">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Support
                        </a>
                    </li>
                    <li>
                        <a href="/login">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Login
                        </a>
                    </li>
                </ul>
            )}
        </div>
    );
}
