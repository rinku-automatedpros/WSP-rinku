'use client'

import { useState } from 'react'
import { fontTitle2, fontBodyNormal, fontHeadline, fontTitle1, fontCaptionNormal, fontBodyBold, fontTitle3 } from '@/styles/typography'
import { cn } from '@/lib/utils'
import SearchInput from '@/components/searchInput'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { MainButton } from '@/components/mainButton'

interface PendingTransaction {
    id: string
    name: string
    timestamp: string
    otpCode: string
    amount: number
    profilePic?: string
}

export default function OtpConfirmation() {
    const [selectedTransaction, setSelectedTransaction] = useState<PendingTransaction | null>(null)
    const [searchQuery, setSearchQuery] = useState("");

    // Mock data
    const mockTransactions: PendingTransaction[] = [
        {
            id: '296571905',
            name: 'Nasser Alsubai',
            timestamp: '9 Feb 2024 — 10:24',
            otpCode: '674951',
            amount: 86.60,
        },
        {
            id: '296571906',
            name: 'Sara Ahmed',
            timestamp: '10 Feb 2024 — 14:45',
            otpCode: '125487',
            amount: 120.75,
        },
        {
            id: '296571907',
            name: 'Ali Khan',
            timestamp: '11 Feb 2024 — 09:30',
            otpCode: '985312',
            amount: 50.20,
        },
        {
            id: '296571908',
            name: 'Fatima Noor',
            timestamp: '12 Feb 2024 — 16:15',
            otpCode: '457812',
            amount: 210.99,
        },
        {
            id: '296571909',
            name: 'Mohammed Rashid',
            timestamp: '13 Feb 2024 — 08:10',
            otpCode: '632154',
            amount: 75.40,
        },
        {
            id: '296571910',
            name: 'Layla Hassan',
            timestamp: '14 Feb 2024 — 12:50',
            otpCode: '784562',
            amount: 95.30,
        },
        {
            id: '296571911',
            name: 'Omar Abdullah',
            timestamp: '15 Feb 2024 — 18:20',
            otpCode: '365421',
            amount: 130.00,
        },
        {
            id: '296571912',
            name: 'Khalid Saeed',
            timestamp: '16 Feb 2024 — 21:05',
            otpCode: '214578',
            amount: 65.85,
        },
        {
            id: '296571913',
            name: 'Aisha Karim',
            timestamp: '17 Feb 2024 — 11:40',
            otpCode: '789654',
            amount: 180.50,
        },
        {
            id: '296571914',
            name: 'Hassan Jafar',
            timestamp: '18 Feb 2024 — 07:25',
            otpCode: '542136',
            amount: 200.75,
        },
    ];


    return (
        <div className="flex min-h-screen flex-col px-4">

            <div className="flex items-center justify-between px-4 pt-7">
                <h1 className={cn("font-medium", fontTitle1)}>Dashboard</h1>
            </div>

            <div className="flex mt-4">
                {/* Left Sidebar */}
                <div className="w-[320px] border-r border-black-10 flex flex-col bg-white-60">
                    <div className="">
                        <div className="flex items-center justify-between border-b border-black-10 p-4 mb-2">
                            <h2 className={cn(fontHeadline, "flex items-center text-black-100")}>Pending <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">1</span></h2>
                            <SearchInput
                                query={searchQuery}
                                setQuery={setSearchQuery}
                                width="w-64"
                            />
                        </div>

                        {/* Transactions List */}
                        <div className="">
                            {mockTransactions.map((transaction) => (
                                <button
                                    key={transaction.id}
                                    onClick={() => setSelectedTransaction(transaction)}
                                    className={cn(
                                        "w-full p-3 flex items-center gap-4",
                                        "border-b border-black-10",
                                        selectedTransaction?.id === transaction.id ? "bg-white-100" : "bg-transparent"
                                    )}
                                >
                                    <Avatar className="h-[60px] w-[60px] rounded-full">
                                        <AvatarImage
                                            src={"https://wsp-rashmi.vercel.app/user.png"}
                                            className="h-auto w-full max-w-[100px] rounded-full"
                                        />
                                    </Avatar>

                                    <div className="flex-1 text-left">
                                        <p className={cn(fontBodyBold, "text-black-100")}>{transaction.name}</p>
                                        <p className={cn(fontCaptionNormal, "text-black-60")}>{transaction.timestamp}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {transaction.otpCode && (
                                            <div className="w-2 h-2 rounded-full bg-semantic-red-100" />
                                        )}
                                        <span className={cn(fontBodyBold, "text-black-100")}>{transaction.otpCode}</span>

                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 bg-white-100 flex flex-col w-[762px] px-20 border-l border-black-10 relative overflow-y-auto">
                    {selectedTransaction ? (
                        <div className="flex flex-col items-center justify-center min-h-full py-20 gap-10">
                            <button
                                className={cn(fontBodyBold, "text-black-100 underline absolute left-5 top-8")}
                                onClick={() => setSelectedTransaction(null)}
                            >
                                Close
                            </button>
                            <div className="flex flex-col items-center justify-center text-center mt-8">
                                <Avatar className="h-[120px] w-[120px] rounded-[0px]">
                                    <AvatarImage
                                        src={"https://wsp-rashmi.vercel.app/user.png"}
                                        className="h-auto w-full max-w-[100px] rounded-[0px] flex items-center justify-center mb-4"
                                    />
                                </Avatar>
                                <h2 className={cn(fontTitle3, "text-black-100 w-[200px] mx-auto truncate text-center")}>{selectedTransaction.name}</h2>
                                <p className={cn(fontBodyNormal, "text-black-60 w-[200px] mx-auto truncate text-center")}>ID: {selectedTransaction.id}</p>
                            </div>

                            <div className="text-center">
                                <p className={cn(fontTitle1, "text-[#FF5634] mb-2")}>{selectedTransaction.otpCode !== "" ? selectedTransaction.otpCode : "******"}</p>
                                <p className={cn(fontBodyNormal, "text-black-100")}>
                                    To accept cash transfers, the rider must enter this 4-digit code in their app before you can accept the transaction.
                                </p>
                            </div>

                            <div className="text-center">
                                <p className={cn(fontBodyNormal, "text-black-100 mb-2")}>
                                    The amount you should receive from the customer
                                </p>
                                <p className={cn(fontTitle1, "text-black-100 mb-6")}>{selectedTransaction.amount}</p>
                                <MainButton variant="primary">Accept Cash Transfer</MainButton>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <p className={`${fontBodyNormal} text-[var(--text-black-40)]`}>Select a transaction to view details</p>
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
} 