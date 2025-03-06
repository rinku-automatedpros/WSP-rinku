'use client'
import { useState, useRef, useMemo, useEffect } from "react"
import { cn } from '@/lib/utils'
import { fontTitle1, fontButtonSmall, fontHeadline, fontBodyNormal, fontCaptionBold, fontCaptionNormal } from '@/styles/typography'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/dialog"
import { Input } from "@/components/input"
import { MainButton } from "@/components/mainButton"
import { IconButton } from "@/components/iconButton"
import { CustomSelect } from "@/components/select"
import SearchInput from "@/components/searchInput"
import { toast } from "@/components/ui/use-toast"
import { EditIcon, LogoutIcon, MailIcon, PhotoCameraIcon, PersonAddIcon, SettingAccountBoxIcon, CloseIcon } from "@/icons"
import { env } from "@/env.mjs"

// Mock data
const mockProfile = {
    user_information: {
        first_name: "John",
        last_name: "Martin",
        email: "john.martin@hotmail.com",
        picture: {
            cid: "" // Empty for default avatar behavior
        }
    },
    performance_metrics: {
        doj: "2024-01-28",
        display_page_after_login: "dashboard"
    }
}

const mockActivities = [
    {
        description: "Logged in to the system",
        date_of_activity: "2024-03-20",
        time_of_activity: "09:30"
    },
    {
        description: "Updated profile information",
        date_of_activity: "2024-03-19",
        time_of_activity: "14:45"
    },
    {
        description: "Changed password",
        date_of_activity: "2024-03-18",
        time_of_activity: "11:20"
    },
    {
        description: "Updated default landing page to Dashboard",
        date_of_activity: "2024-03-17",
        time_of_activity: "16:15"
    },
    {
        description: "Updated profile picture",
        date_of_activity: "2024-03-15",
        time_of_activity: "10:05"
    },
    {
        description: "Logged out from the system",
        date_of_activity: "2024-03-15",
        time_of_activity: "17:30"
    },
    {
        description: "Changed email address",
        date_of_activity: "2024-03-14",
        time_of_activity: "13:25"
    },
    {
        description: "Account settings modified",
        date_of_activity: "2024-03-12",
        time_of_activity: "15:40"
    }
]

export default function Profile() {
    // State management
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [firstName, setFirstName] = useState(mockProfile.user_information.first_name);
    const [lastName, setLastName] = useState(mockProfile.user_information.last_name);
    const [email, setEmail] = useState(mockProfile.user_information.email);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [selectedPage, setSelectedPage] = useState("dashboard");
    const [activitySearch, setActivitySearch] = useState("");
    const [selectedSorting, setSelectedSorting] = useState("asc");

    const PUBLISH_IMAGE_URL = `${env.NEXT_PUBLIC_PUBLISH_IMAGE_URL}/`

    // Format utilities
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
    }

    const formatTime = (timeString: string) => {
        try {
            if (!timeString) return "--:--"
            const timeParts = timeString.split(":")
            if (timeParts.length < 2) return "--:--"
            return timeParts.slice(0, 2).join(":")
        } catch (error) {
            return "--:--"
        }
    }

    // Handlers
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    const handleProfileSave = () => {
        // Mock implementation
        toast({ title: "Profile updated successfully!" });
        setIsDialogOpen(false);
    };

    const handlePasswordSave = () => {
        if (!currentPassword || !newPassword) {
            toast({ title: "Please fill in both password fields." });
            return;
        }
        // Mock implementation
        toast({ title: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
    };

    return (
        <div className="flex min-h-screen flex-col px-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-7">
                <h1 className={cn("font-medium", fontTitle1)}>Profile</h1>
                <div className="flex gap-2">
                    <button
                        className={cn(fontButtonSmall, "py-2 pr-4 pl-3 gap-4 flex items-center rounded-6 border border-black-10")}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <EditIcon /> Edit Profile
                    </button>
                    <button className="rounded-3xl gap-2 flex items-center justify-center border border-black-10 w-[48px] h-[48px]">
                        <LogoutIcon />
                    </button>
                </div>
            </div>

            {/* Profile Header Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mt-8">
                <Card className="lg:col-span-4 col-span-1 rounded-2xl bg-black-5 p-4 gap-4">
                    <CardContent className="flex p-0">
                        <div className="flex gap-4 items-center rounded-lg">
                            <Avatar className="h-50 w-50">
                                <AvatarImage
                                    src={mockProfile.user_information.picture?.cid ? 
                                        `${PUBLISH_IMAGE_URL}${mockProfile.user_information.picture.cid}` : 
                                        undefined}
                                    alt={mockProfile.user_information.first_name}
                                    className="w-full max-w-[100px] w-[100px] h-[100px]"
                                />
                                {!mockProfile.user_information.picture?.cid && (
                                    <span className="inline-flex items-center justify-center transition-colors h-[100px] bg-black-10 min-w-[100px] rounded-full text-[25px] md:text-[30px] lg:text-[30px] leading-[30px] font-bold">
                                        {mockProfile.user_information.first_name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </Avatar>
                            <div>
                                <h3 className={cn(fontHeadline)}>
                                    {`${mockProfile.user_information.first_name} ${mockProfile.user_information.last_name}`}
                                </h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-4 col-span-1 rounded-2xl bg-black-5 p-4 gap-4">
                    <CardContent className="p-0">
                        <div className="gap-1 flex items-center">
                            <MailIcon className="text-icon-black-40" />
                            <p className="fontCaptionNormal text-black-60">Email</p>
                        </div>
                        <div className={cn(fontBodyNormal, "text-black-100 mt-4")}>
                            {mockProfile.user_information.email}
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 col-span-1 rounded-2xl bg-black-5 p-4 gap-4">
                    <CardContent className="p-0">
                        <div className="gap-1 flex items-center">
                            <PersonAddIcon className="text-icon-black-40" />
                            <p className="fontCaptionNormal text-black-60">Join at</p>
                        </div>
                        <div className={cn(fontBodyNormal, "text-black-100 mt-4")}>
                            {formatDate(mockProfile.performance_metrics.doj)}
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 col-span-1 rounded-2xl bg-black-5 p-4 gap-4">
                    <CardContent className="p-0">
                        <div className="gap-1 flex items-center">
                            <SettingAccountBoxIcon className="text-icon-black-40" />
                            <p className="fontCaptionNormal text-black-60">Role</p>
                        </div>
                        <div className={cn(fontBodyNormal, "text-black-100 mt-4")}>
                            Staff
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="my-4 flex flex-row space-x-4">
                {/* Activity List */}
                <div className="flex w-2/3 flex-col rounded-5 bg-white-60 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className={cn(fontHeadline, "flex items-center gap-2")}>
                            Activities
                        </div>
                        <div className="flex items-center space-x-2">
                            <CustomSelect
                                options={[
                                    { label: "Newest First", value: "asc" },
                                    { label: "Oldest", value: "desc" }
                                ]}
                                sortByText="Sort by:"
                                menuPosition="left"
                                onOptionSelect={(option) => setSelectedSorting(option.value)}
                                defaultValue={{ label: "Newest First", value: "asc" }}
                            />
                            <SearchInput
                                query={activitySearch}
                                setQuery={setActivitySearch}
                            />
                        </div>
                    </div>

                    <div className={cn(fontCaptionBold, "flex items-center justify-between rounded-6 bg-black-5 p-4")}>
                        <div className="flex-1 text-black-60">Summary Activity</div>
                        <div className="mx-6 flex-shrink-0 text-black-60">Date</div>
                        <div className="mx-8 flex-shrink-0 text-black-60">Time</div>
                    </div>

                    <div className="masonry-scroll-container h-[calc(100vh-275px)] overflow-y-auto">
                        {mockActivities.map((activity, index) => (
                            <div key={index}>
                                <div className="mb-2 flex items-center justify-between p-4 cursor-pointer text-black-100">
                                    <div className="flex-1">
                                        <span className={cn(fontBodyNormal)}>
                                            {activity.description}
                                        </span>
                                    </div>
                                    <div className="ml-8 flex flex-shrink-0 text-right">
                                        <div className="mx-4 whitespace-nowrap">
                                            {formatDate(activity.date_of_activity)}
                                        </div>
                                        <div className="mx-4 whitespace-nowrap">
                                            {formatTime(activity.time_of_activity)}
                                        </div>
                                    </div>
                                </div>
                                {index < mockActivities.length - 1 && <hr />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side Column */}
                <div className="flex w-1/3 flex-col gap-6">
                    {/* Default Page Settings */}
                    <div className="side-section rounded-5 bg-white-60 p-6">
                        <h3 className={cn(fontHeadline, "mb-4 text-lg font-semibold")}>
                            Default Page After Login
                        </h3>
                        <div className="items-center">
                            <CustomSelect
                                options={[
                                    { label: "Kitchen Display", value: "kitchen_display" },
                                    { label: "Live Counter", value: "live_counter" },
                                    { label: "Dashboard", value: "dashboard" },
                                    { label: "Order Status Screen", value: "order_status_screen" }
                                ]}
                                defaultValue={{ label: "Dashboard", value: "dashboard" }}
                                sortByText=""
                                menuPosition="left"
                                onOptionSelect={(option) => setSelectedPage(option.value)}
                                selectWidth="w-full"
                                menuWidth="w-full"
                            />
                            <MainButton
                                variant="primary"
                                className="mt-5 w-full"
                                onClick={() => toast({ title: "Default page updated!" })}
                            >
                                Set as Default
                            </MainButton>
                        </div>
                    </div>

                    {/* Security Settings */}
                    <div className="side-section rounded-5 bg-white-60 p-6">
                        <h3 className={cn(fontHeadline, "mb-4 text-lg font-semibold")}>
                            Password & Security
                        </h3>
                        <div className="items-center">
                            <Input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full mb-4 rounded-6 border border-black-10 bg-white-60 px-4 py-2 h-[48px]"
                            />
                            <Input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full mb-4 rounded-6 border border-black-10 bg-white-60 px-4 py-2 h-[48px]"
                            />
                            <MainButton
                                variant="primary"
                                className="w-full mt-5"
                                onClick={handlePasswordSave}
                                disabled={!currentPassword && !newPassword}
                            >
                                Change Password
                            </MainButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader className="flex justify-between items-center">
                        <DialogTitle className="fontTitle3">Edit Profile</DialogTitle>
                        <DialogClose asChild>
                            <IconButton
                                variant="primaryWhite"
                                size="large"
                                icon={CloseIcon}
                                iconSize="24"
                                isActive={true}
                                onClick={() => setIsDialogOpen(false)}
                            />
                        </DialogClose>
                    </DialogHeader>

                    <DialogDescription>
                        <div className="flex flex-col gap-6 px-1">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-[60px] w-[60px] rounded-full">
                                    <AvatarImage
                                        src={avatarUrl}
                                        alt={firstName}
                                        className="h-auto w-full max-w-[100px] rounded-full"
                                    />
                                    {!avatarUrl && (
                                        <span className="inline-flex items-center justify-center transition-colors h-[60px] bg-black-10 min-w-[60px] rounded-full text-[18px] md:text-[25px] lg:text-[25px] leading-[30px] font-bold">
                                            {firstName.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </Avatar>
                                <label className="flex items-center gap-1 rounded-full bg-black-10 pl-2 pr-3 py-2 cursor-pointer">
                                    <span className={cn(fontButtonSmall, "text-black-100 flex items-center")}>
                                        <PhotoCameraIcon />
                                        &nbsp;&nbsp;&nbsp;Change Photo
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Input
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    extraStyles="w-full"
                                    icon={EditIcon}
                                />
                                <Input
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    extraStyles="w-full"
                                    icon={EditIcon}
                                />
                                <Input
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    extraStyles="w-full"
                                    icon={MailIcon}
                                />
                            </div>
                        </div>

                        <div className="py-4">
                            <MainButton
                                variant="primary"
                                className="w-full"
                                onClick={handleProfileSave}
                            >
                                Save Changes
                            </MainButton>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
} 