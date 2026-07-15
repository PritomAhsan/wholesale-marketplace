import {
    BadgeCheck,
    Globe,
    MessageCircle,
    ShieldCheck,
} from "lucide-react";

export default function RFQSidebar() {
    return (
        <aside className="sticky top-24 space-y-6">

            <div className="rounded-3xl bg-white p-8 shadow-sm">

                <h3 className="text-xl font-bold">
                    Why send an RFQ?
                </h3>

                <div className="mt-6 space-y-5">

                    <Item
                        icon={<BadgeCheck size={18} />}
                        text="Verified Suppliers"
                    />

                    <Item
                        icon={<MessageCircle size={18} />}
                        text="Multiple Quotations"
                    />

                    <Item
                        icon={<ShieldCheck size={18} />}
                        text="Secure Communication"
                    />

                    <Item
                        icon={<Globe size={18} />}
                        text="Worldwide Suppliers"
                    />

                </div>

            </div>

            <div className="rounded-3xl bg-blue-600 p-8 text-white">

                <div className="grid grid-cols-2 gap-6 text-center">

                    <Stat value="98%" label="Response Rate" />

                    <Stat value="120+" label="Countries" />

                    <Stat value="10K+" label="Suppliers" />

                    <Stat value="<24h" label="Avg Reply" />

                </div>

            </div>

        </aside>
    );
}

function Item({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3">
            {icon}
            <span>{text}</span>
        </div>
    );
}

function Stat({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <div>
            <div className="text-2xl font-black">
                {value}
            </div>

            <div className="text-sm text-blue-100">
                {label}
            </div>
        </div>
    );
}
