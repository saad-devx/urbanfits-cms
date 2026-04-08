import HttpErrorPage from '@/components/code_errorPage';
export default function Error404() {
  return (
    <HttpErrorPage
      error={404}
      heading="WE CAN'T FIND THAT PAGE"
      message="We're Fairly Sure That Page Used To Be Here, But Seems To Have Gone Missing. We Do Apologies On It's Behalf."
    />
  )
}
// export default dynamic(() => Promise.resolve(Error404), { ssr: false })