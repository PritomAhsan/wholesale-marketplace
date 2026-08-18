import {
    BadgeCheck,
    Lock,
    MessageCircle,
    ShieldCheck,
} from "lucide-react";

export default function RFQSidebar() {
    return (
        <aside className="sticky top-24 space-y-4">

            <div className="rounded-xl border border-border bg-white p-5">

                <h3 className="text-sm font-bold text-obsidian">
                    Why send an RFQ?
                </h3>

                <div className="mt-4 space-y-3">

                    <Item
                        icon={<BadgeCheck size={16} />}
                        text="Routed only to privately verified suppliers"
                    />

                    <Item
                        icon={<MessageCircle size={16} />}
                        text="Compare multiple qualified offers in one place"
                    />

                    <Item
                        icon={<ShieldCheck size={16} />}
                        text="Direct contact stays private until you accept"
                    />

                    <Item
                        icon={<Lock size={16} />}
                        text="No obligation to purchase"
                    />

                </div>

            </div>

            <div id="how-offers-work" className="rounded-xl bg-obsidian p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wide text-champagne">
                    How offers work
                </p>
                <ol className="mt-3 space-y-2 text-xs text-ivory/70">
                    <li>1. Bulkare reviews the request.</li>
                    <li>2. Matching approved suppliers respond.</li>
                    <li>3. You compare terms and continue securely.</li>
                </ol>
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
        <div className="flex items-start gap-2.5 text-sm text-obsidian/70">
            <span className="mt-0.5 text-sapphire">{icon}</span>
            <span>{text}</span>
        </div>
    );
}
