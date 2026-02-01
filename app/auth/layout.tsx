interface AuthLayoutProps {
	children: React.ReactNode
}

const AuthLayout = ({children}: AuthLayoutProps) => {
	return (
		<div
			className='flex items-center justify-center flex-1 bg-gradient bg-gradient-to-tr from-primary to-primary/40 hover:to-primary hover:from-primary/40 transition-colors duration-500'>
			<div className='w-full max-w-md mx-auto'>
				{children}
			</div>
		</div>
	)
};

export default AuthLayout;