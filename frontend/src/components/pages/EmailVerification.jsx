const EmailVerification = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-tertiary shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-primary text-center">Vérifiez votre e-mail</h2>
        <p className="text-primary text-center">
          Merci pour votre inscription. Veuillez vérifier votre e-mail et cliquer sur le lien de validation pour activer votre compte.
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
