import HttpErrorPage from '@/components/code_errorPage';
export default function Error403() {
  return (
    <HttpErrorPage
      error={403}
      heading="OH SNAP! ACCESS FORBIDDEN"
      message="You are unauthorized to access the content of this page. Please register on Urban Fits first."
    />
  )
}