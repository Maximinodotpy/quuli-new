<script>
    import {
        Footer,
        FooterCopyright,
        FooterLinkGroup,
        FooterLink,
        FooterBrand,
        FooterIcon,
    } from "flowbite-svelte";
    import {
        FacebookSolid,
        GithubSolid,
        DiscordSolid,
        TwitterSolid,
    } from "flowbite-svelte-icons";
</script>

<Footer footerType="socialmedia">
    <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
            <FooterBrand
                href="/"
                src="/favicon.svg"
                alt="Quuli Logo"
                name="Quuli"
            />
        </div>
        <div class="grid gap-8 sm:gap-12 sm:grid-cols-2">
            <!-- <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Resources
                </h2>
                <FooterLinkGroup>
                    <FooterLink liClass="mb-4" href="/">Flowbite</FooterLink>
                    <FooterLink liClass="mb-4" href="/">Tailwind CSS</FooterLink>
                </FooterLinkGroup>
            </div> -->
            <div>
                <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Folge mir</h2>
                <FooterLinkGroup>
                    <FooterLink liClass="mb-4" href="https://github.com/Maximinodotpy" target="_blank">GitHub</FooterLink>
                    <!-- <FooterLink liClass="mb-4" href="/">Instagram</FooterLink> -->
                </FooterLinkGroup>
            </div>
            <div>
                <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Sonstiges</h2>
                <FooterLinkGroup>
                    <FooterLink liClass="mb-4" href="/">Home</FooterLink>
                    <FooterLink liClass="mb-4" href="/ueber">Impressum</FooterLink>
                </FooterLinkGroup>
            </div>
        </div>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div class="flex items-center justify-between">
        <FooterCopyright href="/" by="Quuli" copyrightMessage="" />
        <div class="flex mt-4 space-x-6 rtl:space-x-reverse sm:justify-center sm:mt-0 items-center">
            <!-- <FooterIcon href="/">
                <FacebookSolid class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"/>
            </FooterIcon>
            <FooterIcon href="/">
                <DiscordSolid class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"/>
            </FooterIcon>
            <FooterIcon href="/">
                <TwitterSolid class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"/>
            </FooterIcon> -->
            <FooterIcon>

            </FooterIcon>
            <FooterIcon href="https://github.com/Maximinodotpy/quuli-new" target="_blank">
                <GithubSolid class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"/>
            </FooterIcon>
        </div>
    </div>
</Footer>
