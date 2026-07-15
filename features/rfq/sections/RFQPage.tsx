import Container from "@/components/layout/Container";

import RFQHero from "../components/RFQHero";
import RFQForm from "../components/RFQForm";
import RFQSidebar from "../components/RFQSidebar";

export default function RFQPage() {
    return (
        <>
            <RFQHero />

            <section className="bg-slate-50 py-16">

                <Container>

                    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

                        <RFQForm />

                        <RFQSidebar />

                    </div>

                </Container>

            </section>
        </>
    );
}