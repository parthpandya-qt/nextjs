interface ProfilePage {
    params: Promise<{
        id: string;
    }>;
}

export default async function Profile({ params }: ProfilePage) {

    const { id } = await params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-200">

            <h1 className="text-3xl font-bold mb-4">
                Hi User
            </h1>

            <p className="text-xl bg-white px-4 py-2 rounded">
                User ID: {id}
            </p>

        </div>
    );
}