import Container from "@/components/layout/Container";

const User = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Container>
      <h1 className="flex flex-col max-w-[400px] m-auto mt-8 gap-1 text-2xl font-bold">User Profile: {id}</h1>
    </Container>
  );
};
export default User;
