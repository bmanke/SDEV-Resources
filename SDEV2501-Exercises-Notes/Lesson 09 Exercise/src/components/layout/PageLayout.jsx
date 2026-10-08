const PageLayout = ({ header, left, right }) => {
    return (
        <div className="min-h-screen">
            <header>{header}</header>
            <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                <div>{left}</div>
                <div>{right}</div>
            </main>
        </div>
    );
};

export default PageLayout;