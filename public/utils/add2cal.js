const atcbVersion = "1.14.2",
  isBrowser = new Function(
    "try { return this===window; } catch(e) { return false; }"
  ),
  isiOS = isBrowser()
    ? new Function(
        'if ((/iPad|iPhone|iPod/i.test(navigator.userAgent || navigator.vendor || window.opera) && !window.MSStream) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) { return true; } else { return false; }'
      )
    : new Function("return false;"),
  isAndroid = isBrowser()
    ? new Function(
        "if (/android/i.test(navigator.userAgent || navigator.vendor || window.opera) && !window.MSStream) { return true; } else { return false; }"
      )
    : new Function("return false;"),
  isMobile = new Function(
    "if (isAndroid() || isiOS()) { return true; } else { return false; }"
  ),
  isWebView = isBrowser()
    ? new Function(
        "if (/(; ?wv|(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari))/i.test(navigator.userAgent || navigator.vendor)) { return true; } else { return false; }"
      )
    : new Function("return false;"),
  isProblematicWebView = isBrowser()
    ? new Function(
        "if (/(Instagram)/i.test(navigator.userAgent || navigator.vendor || window.opera)) { return true; } else { return false; }"
      )
    : new Function("return false;")
let atcbDefaultTarget = "_blank"
isWebView() && (atcbDefaultTarget = "_system")
const atcbIcon = {
  trigger:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200.016"><path d="M132.829 7.699c0-4.248 4.199-7.699 9.391-7.699s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zm-5.941 123.747c2.979 0 5.404 2.425 5.404 5.404s-2.425 5.404-5.404 5.404l-21.077-.065-.065 21.045c0 2.979-2.425 5.404-5.404 5.404s-5.404-2.425-5.404-5.404l.065-21.061-21.045-.081c-2.979 0-5.404-2.425-5.404-5.404s2.425-5.404 5.404-5.404l21.061.065.065-21.045c0-2.979 2.425-5.404 5.404-5.404s5.404 2.425 5.404 5.404l-.065 21.077 21.061.065zM48.193 7.699C48.193 3.451 52.393 0 57.585 0s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zM10.417 73.763h179.167V34.945c0-1.302-.537-2.49-1.4-3.369-.863-.863-2.051-1.4-3.369-1.4h-17.171c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h17.171c4.183 0 7.975 1.709 10.726 4.46S200 30.762 200 34.945v44.043 105.843c0 4.183-1.709 7.975-4.46 10.726s-6.543 4.46-10.726 4.46H15.186c-4.183 0-7.975-1.709-10.726-4.46C1.709 192.79 0 188.997 0 184.814V78.988 34.945c0-4.183 1.709-7.975 4.46-10.726s6.543-4.46 10.726-4.46h18.343c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208H15.186c-1.302 0-2.49.537-3.369 1.4-.863.863-1.4 2.051-1.4 3.369zm179.167 10.433H10.417v100.618c0 1.302.537 2.49 1.4 3.369.863.863 2.051 1.4 3.369 1.4h169.629c1.302 0 2.49-.537 3.369-1.4.863-.863 1.4-2.051 1.4-3.369zM82.08 30.176c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h34.977c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208z"/></svg>',
  apple:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 245.657"><path d="M167.084 130.514c-.308-31.099 25.364-46.022 26.511-46.761-14.429-21.107-36.91-24.008-44.921-24.335-19.13-1.931-37.323 11.27-47.042 11.27-9.692 0-24.67-10.98-40.532-10.689-20.849.308-40.07 12.126-50.818 30.799-21.661 37.581-5.54 93.281 15.572 123.754 10.313 14.923 22.612 31.688 38.764 31.089 15.549-.612 21.433-10.073 40.242-10.073s24.086 10.073 40.546 9.751c16.737-.308 27.34-15.214 37.585-30.187 11.855-17.318 16.714-34.064 17.009-34.925-.372-.168-32.635-12.525-32.962-49.68l.045-.013zm-30.917-91.287C144.735 28.832 150.524 14.402 148.942 0c-12.344.503-27.313 8.228-36.176 18.609-7.956 9.216-14.906 23.904-13.047 38.011 13.786 1.075 27.862-7.004 36.434-17.376z"/></svg>',
  google:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M152.637 47.363H47.363v105.273h105.273z" fill="#fff"/><path d="M152.637 200L200 152.637h-47.363z" fill="#f72a25"/><path d="M200 47.363h-47.363v105.273H200z" fill="#fbbc04"/><path d="M152.637 152.637H47.363V200h105.273z" fill="#34a853"/><path d="M0 152.637v31.576A15.788 15.788 0 0 0 15.788 200h31.576v-47.363z" fill="#188038"/><path d="M200 47.363V15.788A15.79 15.79 0 0 0 184.212 0h-31.575v47.363z" fill="#1967d2"/><path d="M15.788 0A15.79 15.79 0 0 0 0 15.788v136.849h47.363V47.363h105.274V0z" fill="#4285f4"/><path d="M68.962 129.02c-3.939-2.653-6.657-6.543-8.138-11.67l9.131-3.76c.83 3.158 2.279 5.599 4.346 7.341 2.051 1.742 4.557 2.588 7.471 2.588 2.995 0 5.55-.911 7.699-2.718 2.148-1.823 3.223-4.134 3.223-6.934 0-2.865-1.139-5.208-3.402-7.031s-5.111-2.718-8.496-2.718h-5.273v-9.033h4.736c2.913 0 5.387-.781 7.389-2.376 2.002-1.579 2.995-3.743 2.995-6.494 0-2.441-.895-4.395-2.686-5.859s-4.053-2.197-6.803-2.197c-2.686 0-4.818.716-6.396 2.148s-2.767 3.255-3.451 5.273l-9.033-3.76c1.204-3.402 3.402-6.396 6.624-8.984s7.34-3.89 12.337-3.89c3.695 0 7.031.716 9.977 2.148s5.257 3.418 6.934 5.941c1.676 2.539 2.507 5.387 2.507 8.545 0 3.223-.781 5.941-2.327 8.187-1.546 2.23-3.467 3.955-5.729 5.143v.537a17.39 17.39 0 0 1 7.34 5.729c1.904 2.572 2.865 5.632 2.865 9.212s-.911 6.771-2.718 9.57c-1.823 2.799-4.329 5.013-7.52 6.624s-6.787 2.425-10.775 2.425c-4.622 0-8.887-1.318-12.826-3.988zm56.087-45.312l-10.026 7.243-5.013-7.601 17.985-12.972h6.901v61.198h-9.847z" fill="#1a73e8"/></svg>',
  ical: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200.016"><path d="M132.829 7.699c0-4.248 4.199-7.699 9.391-7.699s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zm-25.228 161.263c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm-81.803-59.766c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.918 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zM25.798 139.079c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.918 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zM25.798 168.962c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zM48.193 7.699C48.193 3.451 52.393 0 57.585 0s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zM10.417 73.763h179.15V34.945c0-1.302-.537-2.49-1.4-3.369-.863-.863-2.051-1.4-3.369-1.4h-17.155c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h17.171c4.183 0 7.975 1.709 10.726 4.46S200 30.762 200 34.945v44.043 105.843c0 4.183-1.709 7.975-4.46 10.726s-6.543 4.46-10.726 4.46H15.186c-4.183 0-7.975-1.709-10.726-4.46C1.709 192.79 0 188.997 0 184.814V78.971 34.945c0-4.183 1.709-7.975 4.46-10.726s6.543-4.46 10.726-4.46h18.343c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208H15.186c-1.302 0-2.49.537-3.369 1.4-.863.863-1.4 2.051-1.4 3.369zm179.167 10.433H10.417v100.618c0 1.302.537 2.49 1.4 3.369.863.863 2.051 1.4 3.369 1.4h169.629c1.302 0 2.49-.537 3.369-1.4.863-.863 1.4-2.051 1.4-3.369zM82.08 30.176c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h34.977c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208z"/></svg>',
  msteams:
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 186.047"><path d="M195.349 39.535a20.93 20.93 0 1 1-41.86 0 20.93 20.93 0 1 1 41.86 0zm-55.847 30.233h51.66A8.84 8.84 0 0 1 200 78.605v47.056c0 17.938-14.541 32.479-32.479 32.479h0-.154c-17.938.003-32.481-14.537-32.484-32.474v-.005-51.274a4.62 4.62 0 0 1 4.619-4.619z" fill="#5059c9"/><path d="M149.614 69.767H64.34c-4.823.119-8.637 4.122-8.526 8.944v53.67c-.673 28.941 22.223 52.957 51.163 53.665 28.94-.708 51.836-24.725 51.163-53.665v-53.67c.112-4.823-3.703-8.825-8.526-8.944zm-10.079-39.535a30.233 30.233 0 0 1-60.465 0 30.233 30.233 0 0 1 60.465 0z" fill="#7b83eb"/><path opacity=".1" d="M111.628 69.767v75.209c-.023 3.449-2.113 6.547-5.302 7.86-1.015.43-2.107.651-3.209.651H59.907l-1.628-4.651c-1.628-5.337-2.459-10.885-2.465-16.465V78.698c-.112-4.815 3.697-8.811 8.512-8.93z"/><path opacity=".2" d="M106.977 69.767v79.86a8.241 8.241 0 0 1-.651 3.209c-1.313 3.189-4.412 5.279-7.86 5.302H62.093l-2.186-4.651a46.13 46.13 0 0 1-1.628-4.651 56.647 56.647 0 0 1-2.465-16.465V78.698c-.112-4.815 3.697-8.811 8.512-8.93z"/><path opacity=".2" d="M102.326 69.767v70.558a8.58 8.58 0 0 1-8.512 8.512H58.279a56.647 56.647 0 0 1-2.465-16.465V78.698c-.112-4.815 3.697-8.811 8.512-8.93z"/><path opacity=".1" d="M111.628 45.721v14.651l-2.326.093c-.791 0-1.535-.046-2.326-.093-1.57-.104-3.127-.353-4.651-.744a30.233 30.233 0 0 1-20.93-17.767 25.845 25.845 0 0 1-1.488-4.651h23.209c4.693.018 8.494 3.818 8.512 8.512z"/><use xlink:href="#B" opacity=".2" transform="scale(.08973306)"/><path d="M106.977 50.372v10c-1.57-.104-3.127-.353-4.651-.744a30.233 30.233 0 0 1-20.93-17.767h17.07c4.693.018 8.494 3.818 8.512 8.512zm0 19.395v70.558a8.58 8.58 0 0 1-8.512 8.512H58.279a56.647 56.647 0 0 1-2.465-16.465V78.698c-.112-4.815 3.697-8.811 8.512-8.93z" opacity=".2"/><path opacity=".2" d="M102.326 50.372v9.256a30.233 30.233 0 0 1-20.93-17.767h12.419c4.693.018 8.494 3.818 8.512 8.512z"/><linearGradient id="A" gradientUnits="userSpaceOnUse" x1="17.776" y1="35.199" x2="84.55" y2="150.848"><stop offset="0" stop-color="#5a62c3"/><stop offset=".5" stop-color="#4d55bd"/><stop offset="1" stop-color="#3940ab"/></linearGradient><path fill="url(#A)" d="M8.526 41.86H93.8a8.53 8.53 0 0 1 8.526 8.526v85.274a8.53 8.53 0 0 1-8.526 8.526H8.526A8.53 8.53 0 0 1 0 135.66V50.386a8.53 8.53 0 0 1 8.526-8.526z"/><path fill="#fff" d="M73.6 74.316H56.553v46.419h-10.86V74.316H28.726v-9.005H73.6z"/><defs><path id="B" d="M1192.167 561.355v111.442c-17.496-1.161-34.848-3.937-51.833-8.293a336.92 336.92 0 0 1-233.25-198.003h190.228c52.304.198 94.656 42.55 94.855 94.854z"/></defs></svg>',
  ms365:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 239.766"><path fill="#ea3e23" d="M200 219.785l-.021-.012V20.591L128.615 0 .322 48.172 0 48.234.016 192.257l43.78-17.134V57.943l84.819-20.279-.012 172.285L.088 192.257l128.515 47.456v.053l71.376-19.753v-.227z"/></svg>',
  outlookcom:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 175"><path d="M178.725 0H71.275A8.775 8.775 0 0 0 62.5 8.775v9.975l60.563 18.75L187.5 18.75V8.775A8.775 8.775 0 0 0 178.725 0z" fill="#0364b8"/><path d="M197.813 96.281c.915-2.878 2.187-5.855 2.187-8.781-.002-1.485-.795-2.857-1.491-3.26l-68.434-38.99a9.37 9.37 0 0 0-9.244-.519c-.312.154-.614.325-.906.512l-67.737 38.6-.025.013-.075.044a4.16 4.16 0 0 0-2.088 3.6c.541 2.971 1.272 5.904 2.188 8.781l71.825 52.532z" fill="#0a2767"/><path d="M150 18.75h-43.75L93.619 37.5l12.631 18.75L150 93.75h37.5v-37.5z" fill="#28a8ea"/><path d="M150 18.75h37.5v37.5H150z" fill="#50d9ff"/><path d="M150 93.75l-43.75-37.5H62.5v37.5l43.75 37.5 67.7 11.05z" fill="#0364b8"/><path d="M106.25 56.25v37.5H150v-37.5zM150 93.75v37.5h37.5v-37.5zm-87.5-75h43.75v37.5H62.5z" fill="#0078d4"/><path d="M62.5 93.75h43.75v37.5H62.5z" fill="#064a8c"/><path d="M126.188 145.113l-73.706-53.75 3.094-5.438 68.181 38.825a3.3 3.3 0 0 0 2.625-.075l68.331-38.937 3.1 5.431z" fill="#0a2767" opacity=".5"/><path d="M197.919 91.106l-.088.05-.019.013-67.738 38.588c-2.736 1.764-6.192 1.979-9.125.569l23.588 31.631 51.588 11.257v-.001c2.434-1.761 3.876-4.583 3.875-7.587V87.5c.001 1.488-.793 2.862-2.081 3.606z" fill="#1490df"/><path d="M200 165.625v-4.613l-62.394-35.55-7.531 4.294a9.356 9.356 0 0 1-9.125.569l23.588 31.631 51.588 11.231v.025a9.362 9.362 0 0 0 3.875-7.588z" opacity=".05"/><path d="M199.688 168.019l-68.394-38.956-1.219.688c-2.734 1.766-6.19 1.984-9.125.575l23.588 31.631 51.587 11.256v.001a9.38 9.38 0 0 0 3.562-5.187z" opacity=".1"/><path d="M51.455 90.721c-.733-.467-1.468-1.795-1.455-3.221v78.125c-.007 5.181 4.194 9.382 9.375 9.375h131.25c1.395-.015 2.614-.366 3.813-.813.638-.258 1.252-.652 1.687-.974z" fill="#28a8ea"/><path d="M112.5 141.669V39.581a8.356 8.356 0 0 0-8.331-8.331H62.687v46.6l-10.5 5.987-.031.012-.075.044A4.162 4.162 0 0 0 50 87.5v.031-.031V150h54.169a8.356 8.356 0 0 0 8.331-8.331z" opacity=".1"/><path d="M106.25 147.919V45.831a8.356 8.356 0 0 0-8.331-8.331H62.687v40.35l-10.5 5.987-.031.012-.075.044A4.162 4.162 0 0 0 50 87.5v.031-.031 68.75h47.919a8.356 8.356 0 0 0 8.331-8.331z" opacity=".2"/><path d="M106.25 135.419V45.831a8.356 8.356 0 0 0-8.331-8.331H62.687v40.35l-10.5 5.987-.031.012-.075.044A4.162 4.162 0 0 0 50 87.5v.031-.031 56.25h47.919a8.356 8.356 0 0 0 8.331-8.331z" opacity=".2"/><path d="M100 135.419V45.831a8.356 8.356 0 0 0-8.331-8.331H62.687v40.35l-10.5 5.987-.031.012-.075.044A4.162 4.162 0 0 0 50 87.5v.031-.031 56.25h41.669a8.356 8.356 0 0 0 8.331-8.331z" opacity=".2"/><path d="M8.331 37.5h83.337A8.331 8.331 0 0 1 100 45.831v83.338a8.331 8.331 0 0 1-8.331 8.331H8.331A8.331 8.331 0 0 1 0 129.169V45.831A8.331 8.331 0 0 1 8.331 37.5z" fill="#0078d4"/><path d="M24.169 71.675a26.131 26.131 0 0 1 10.263-11.337 31.031 31.031 0 0 1 16.313-4.087 28.856 28.856 0 0 1 15.081 3.875 25.875 25.875 0 0 1 9.988 10.831 34.981 34.981 0 0 1 3.5 15.938 36.881 36.881 0 0 1-3.606 16.662 26.494 26.494 0 0 1-10.281 11.213 30 30 0 0 1-15.656 3.981 29.556 29.556 0 0 1-15.425-3.919 26.275 26.275 0 0 1-10.112-10.85 34.119 34.119 0 0 1-3.544-15.744 37.844 37.844 0 0 1 3.481-16.563zm10.938 26.613a16.975 16.975 0 0 0 5.769 7.463 15.069 15.069 0 0 0 9.019 2.719 15.831 15.831 0 0 0 9.631-2.806 16.269 16.269 0 0 0 5.606-7.481 28.913 28.913 0 0 0 1.787-10.406 31.644 31.644 0 0 0-1.687-10.538 16.681 16.681 0 0 0-5.413-7.75 14.919 14.919 0 0 0-9.544-2.956 15.581 15.581 0 0 0-9.231 2.744 17.131 17.131 0 0 0-5.9 7.519 29.85 29.85 0 0 0-.044 21.5z" fill="#fff"/></svg>',
  yahoo:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 177.803"><path d="M0 43.284h38.144l22.211 56.822 22.5-56.822h37.135L64.071 177.803H26.694l15.308-35.645L.001 43.284zm163.235 45.403H121.64L158.558 0 200 .002zm-30.699 8.488c12.762 0 23.108 10.346 23.108 23.106s-10.345 23.106-23.108 23.106a23.11 23.11 0 0 1-23.104-23.106 23.11 23.11 0 0 1 23.104-23.106z" fill="#5f01d1"/></svg>',
  close:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M2.321 13.529a7.927 7.927 0 0 1 0-11.208 7.927 7.927 0 0 1 11.208 0l86.471 86.471L186.47 2.321a7.927 7.927 0 0 1 11.209 0 7.927 7.927 0 0 1 0 11.208l-86.474 86.469 86.472 86.473a7.927 7.927 0 0 1-11.209 11.208l-86.471-86.471-86.469 86.471a7.927 7.927 0 0 1-11.208-11.208l86.471-86.473z"/></svg>',
  browser:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 245.657"><path d="M117.011 163.676q-6.283 6.218-13.623 12.419l6.087-1.009a80.373 80.373 0 0 0 11.524-3.255l.7 1.042 1.628 2.067h0 0a26.693 26.693 0 0 0 3.467 3.255 89.992 89.992 0 0 1-15.837 4.753 95.592 95.592 0 0 1-37.159 0 87.046 87.046 0 0 1-17.253-5.322.423.423 0 0 1-.228-.114 101.077 101.077 0 0 1-15.625-8.415 88.56 88.56 0 0 1-13.672-11.214 85.761 85.761 0 0 1-11.214-13.64 97.317 97.317 0 0 1-8.545-15.658 90.806 90.806 0 0 1-5.436-17.546 95.592 95.592 0 0 1 0-37.159 86.037 86.037 0 0 1 5.339-17.253.537.537 0 0 1 .098-.228 98.212 98.212 0 0 1 8.545-15.707 87.893 87.893 0 0 1 11.214-13.656 84.947 84.947 0 0 1 13.672-11.231A97.17 97.17 0 0 1 56.43 7.259a88.739 88.739 0 0 1 17.448-5.436 95.592 95.592 0 0 1 37.159 0 87.714 87.714 0 0 1 17.253 5.322.456.456 0 0 1 .212.114 100.507 100.507 0 0 1 15.756 8.545 88.56 88.56 0 0 1 13.623 11.198 85.077 85.077 0 0 1 11.214 13.688 94.713 94.713 0 0 1 8.545 15.739 88.739 88.739 0 0 1 5.436 17.481l.195.977-8.822-2.49a76.499 76.499 0 0 0-4.232-12.744 88.251 88.251 0 0 0-4.671-9.375H138.48a106.562 106.562 0 0 1 6.836 13.819l-10.026-2.702a106.985 106.985 0 0 0-6.283-11.117H96.454v5.55l-.993.358a21.941 21.941 0 0 0-7.097 4.362V50.245H55.812q-12.484 19.385-14.03 38.152H83.4q1.628 4.02 3.402 8.138H41.7c.505 12.81 4.883 25.505 12.826 38.152h33.888v-34.49l8.138 17.904v16.553h7.748l3.727 8.138H96.503v28.5a201.567 201.567 0 0 0 17.139-15.707q1.709 4.053 3.369 8.138zm69.761-4.167a7.552 7.552 0 0 1-1.904 1.286h-.13a6.738 6.738 0 0 1-7.097-.977l-18.881-16.016-6.511 15.902a21.045 21.045 0 0 1-1.937 3.662 14.812 14.812 0 0 1-2.458 2.865 7.78 7.78 0 0 1-12.207-1.335 15.105 15.105 0 0 1-1.497-2.653c-11.231-28.467-26.465-56.805-37.859-85.289a5.062 5.062 0 0 1 5.68-6.966c27.296 5.046 62.664 16.586 90.416 23.943 8.627 2.279 10.026 9.88 3.662 15.772a19.874 19.874 0 0 1-3.255 2.474c-4.883 2.767-9.766 5.973-14.649 8.903l18.799 16.114a6.917 6.917 0 0 1 1.628 2.051v.13a6.966 6.966 0 0 1 .635 2.393h0a6.934 6.934 0 0 1-.26 2.507 7.145 7.145 0 0 1-1.172 2.262 153.894 153.894 0 0 1-11.003 12.972zm-4.883-6.25l9.099-10.677c-4.004-3.434-21.159-16.748-22.933-19.955a3.923 3.923 0 0 1 1.351-5.29c5.957-3.255 13.607-7.91 19.255-11.67a13.64 13.64 0 0 0 1.986-1.449 7.194 7.194 0 0 0 1.221-1.416l.26-.488-.505-.293a6.38 6.38 0 0 0-1.237-.423l-84.589-22.494 35.531 79.982a7.813 7.813 0 0 0 .619 1.139l.358.472.456-.326a7.341 7.341 0 0 0 1.188-1.449 12.224 12.224 0 0 0 1.107-2.165c2.653-6.511 5.68-15.414 8.789-21.436l.374-.521a3.906 3.906 0 0 1 5.485-.439l22.201 18.832zM81.594 176.095a171.814 171.814 0 0 1-31.348-33.334h-25.57A83.824 83.824 0 0 0 45.2 162.292a85.956 85.956 0 0 0 14.47 7.813.22.22 0 0 0 .179.114 79.966 79.966 0 0 0 15.69 4.883 106.008 106.008 0 0 0 6.104 1.009zm-62.241-41.44h25.733a82.359 82.359 0 0 1-11.394-38.152H8.138a90.741 90.741 0 0 0 1.628 12.923 78.566 78.566 0 0 0 4.883 15.902 88.153 88.153 0 0 0 4.655 9.375zM8.138 88.397h25.635A88.511 88.511 0 0 1 46.42 50.245H19.353a88.153 88.153 0 0 0-4.704 9.375s0 .114-.114.163A81.236 81.236 0 0 0 9.652 75.49a83.759 83.759 0 0 0-1.628 12.907zm16.488-46.241h27.003A191.606 191.606 0 0 1 82.131 8.708c-2.262.277-4.492.602-6.641 1.058a78.713 78.713 0 0 0-15.87 4.883 89.911 89.911 0 0 0-14.47 7.813 83.824 83.824 0 0 0-20.525 19.532h0zm78.127-33.448a186.577 186.577 0 0 1 30.518 33.448h27.019a79.152 79.152 0 0 0-8.138-9.375 81.073 81.073 0 0 0-12.419-10.205 86.705 86.705 0 0 0-14.405-7.829s-.098 0-.163-.098a79.999 79.999 0 0 0-15.69-4.883c-2.214-.439-4.443-.781-6.657-1.058h0zm-6.25 5.274v28.175h26.84a188.286 188.286 0 0 0-26.84-28.175zm-8.138 157.279v-28.5H60.223a171.993 171.993 0 0 0 28.24 28.5zm0-129.105V13.981a189.295 189.295 0 0 0-26.807 28.175z"/></svg>',
}
function atcb_init() {
  console.log(
    "add-to-calendar button initialized (version " + atcbVersion + ")"
  ),
    console.log(
      "See https://github.com/add2cal/add-to-calendar-button for details"
    )
  const a = document.querySelectorAll(".atcb")
  if (0 < a.length) {
    var n = document.querySelectorAll(".atcb-initialized")
    for (let t = 0; t < a.length; t++)
      if (!a[parseInt(t)].classList.contains("atcb-initialized")) {
        let e = JSON.parse(
          atcb_seure_content(
            a[parseInt(t)].innerHTML.replace(/(\r\n|\n|\r)/g, ""),
            !1
          )
        )
        atcb_check_required((e = atcb_patch_config(e))) &&
          atcb_validate((e = atcb_decorate_data(e))) &&
          ((null != e.identifier && "" != e.identifier) ||
            (e.identifier = "atcb-btn-" + (t + n.length + 1)),
          atcb_generate(a[parseInt(t)], e))
      }
  }
}
function atcb_patch_config(t) {
  null != t.event &&
    (Object.keys(t.event).forEach((e) => {
      "@" !== e.charAt(0) && (t["" + e] = t.event["" + e])
    }),
    delete t.event)
  const a = {
    title: "name",
    dateStart: "startDate",
    dateEnd: "endDate",
    timeStart: "startTime",
    timeEnd: "endTime",
  }
  return (
    Object.keys(a).forEach((e) => {
      null == t[a["" + e]] && null != t["" + e] && (t[a["" + e]] = t["" + e])
    }),
    t
  )
}
function atcb_decorate_data(a) {
  for (let t = 0; t < a.options.length; t++) {
    let e = a.options["" + t].split("|")
    a.options["" + t] = e[0]
      .toLowerCase()
      .replace("microsoft", "ms")
      .replace(".", "")
  }
  if (
    (((a = atcb_date_cleanup(a)).startDate = atcb_date_calculation(
      a.startDate
    )),
    (a.endDate = atcb_date_calculation(a.endDate)),
    (null != a.listStyle && "" != a.listStyle) || (a.listStyle = "dropdown"),
    "modal" === a.listStyle && (a.trigger = "click"),
    null != a.size && "" != a.size && 0 <= a.size && a.size < 11
      ? (a.size = 10 + parseInt(a.size))
      : (a.size = 16),
    null == a.lightMode || "" == a.lightMode)
  )
    a.lightMode = "light"
  else if (null != a.lightMode && "" != a.lightMode) {
    var e = window.matchMedia("(prefers-color-scheme: dark)")
    switch (a.lightMode) {
      case "system":
        e.matches ? (a.lightMode = "dark") : (a.lightMode = "light")
        break
      case "bodyScheme":
      case "dark":
        break
      default:
        a.lightMode = "light"
    }
  }
  if (
    ((null != a.language && "" != a.language) || (a.language = "en"),
    null != a.recurrence &&
      "" != a.recurrence &&
      (a.recurrence = a.recurrence.replace(/\s+/g, "")),
    !a.description || a.descriptionHtmlFree)
  )
    return a
  const t = Object.assign({}, a)
  return (
    (t.descriptionHtmlFree = atcb_rewrite_html_elements(t.description, !0)),
    (t.description = atcb_rewrite_html_elements(t.description)),
    t
  )
}
function atcb_check_required(t) {
  if (null == t.options || t.options.length < 1)
    return (
      console.error("add-to-calendar button generation failed: no options set"),
      !1
    )
  return ["name", "startDate"].every(function (e) {
    return (
      (null != t["" + e] && "" != t["" + e]) ||
      (console.error(
        "add-to-calendar button generation failed: required setting missing [" +
          e +
          "]"
      ),
      !1)
    )
  })
}
function atcb_date_cleanup(n) {
  ;(null != n.endDate && "" != n.endDate) ||
    null == n.startDate ||
    (n.endDate = n.startDate)
  return (
    ["start", "end"].forEach(function (e) {
      var t
      if (
        (null != n[e + "Date"] &&
          ((n[e + "Date"] = n[e + "Date"]
            .replace(/\.\d{3}/, "")
            .replace("Z", "")),
          null != (t = n[e + "Date"].split("T"))[1] &&
            ((n[e + "Date"] = t[0]), (n[e + "Time"] = t[1]))),
        null != n[e + "Time"] && 8 === n[e + "Time"].length)
      ) {
        const a = n[e + "Time"]
        n[e + "Time"] = a.substring(0, a.length - 3)
      }
    }),
    n
  )
}
function atcb_date_calculation(e) {
  const t = new Date()
  var a = t.getUTCMonth() + 1 + "-" + t.getUTCDate() + "-" + t.getUTCFullYear()
  const n = (e = e.replace(/today/gi, a)).split("+")
  a = n[0].split("-")
  let o = new Date(a[0], a[1] - 1, a[2])
  return (
    a[0].length < 4 && (o = new Date(a[2], a[0] - 1, a[1])),
    null != n[1] && 0 < n[1] && o.setDate(o.getDate() + parseInt(n[1])),
    o.getFullYear() +
      "-" +
      (o.getMonth() + 1 < 10 ? "0" : "") +
      (o.getMonth() + 1) +
      "-" +
      (o.getDate() < 10 ? "0" : "") +
      o.getDate()
  )
}
function atcb_validate(a) {
  if (
    (null == a.identifier ||
      "" == a.identifier ||
      /^[\w-]+$/.test(a.identifier) ||
      ((a.identifier = ""),
      console.error(
        "add-to-calendar button generation: identifier invalid - using auto numbers instead"
      )),
    !(
      null == a.icsFile ||
      "" == a.icsFile ||
      (atcb_secure_url(a.icsFile, !1) && /\.ics$/.test(a.icsFile))
    ))
  )
    return (
      console.error(
        "add-to-calendar button generation failed: explicit ics file path not valid"
      ),
      !1
    )
  const t = [
      "apple",
      "google",
      "ical",
      "ms365",
      "outlookcom",
      "msteams",
      "yahoo",
    ],
    n = ["apple", "google", "ical"]
  if (
    !a.options.every(function (e) {
      e = e.split("|")
      return (
        !!t.includes(e[0]) ||
        (console.error(
          "add-to-calendar button generation failed: invalid option [" +
            e[0] +
            "]"
        ),
        !1)
      )
    })
  )
    return !1
  if ((null != a.recurrence) & ("" != a.recurrence)) {
    let t = !1
    if (
      (a.options.forEach(function (e) {
        e = e.split("|")
        n.includes(e[0]) && (t = !0)
      }),
      !t)
    )
      return (
        console.error(
          "add-to-calendar button generation failed: no supported valid option for recurring events"
        ),
        !1
      )
  }
  const e = ["startDate", "endDate"],
    o = e
  if (
    !e.every(function (e) {
      if (10 !== a["" + e].length)
        return (
          console.error(
            "add-to-calendar button generation failed: date misspelled [-> YYYY-MM-DD]"
          ),
          !1
        )
      var t = a["" + e].split("-")
      return t.length < 3 || 3 < t.length
        ? (console.error(
            "add-to-calendar button generation failed: date misspelled [" +
              e +
              ": " +
              a["" + e] +
              "]"
          ),
          !1)
        : ((o["" + e] = new Date(t[0], t[1] - 1, t[2])), !0)
    })
  )
    return !1
  return (
    !!["startTime", "endTime"].every(function (e) {
      if (null != a["" + e]) {
        if (5 !== a["" + e].length)
          return (
            console.error(
              "add-to-calendar button generation failed: time misspelled [-> HH:MM]"
            ),
            !1
          )
        var t = a["" + e].split(":")
        if (t.length < 2 || 2 < t.length)
          return (
            console.error(
              "add-to-calendar button generation failed: time misspelled [" +
                e +
                ": " +
                a["" + e] +
                "]"
            ),
            !1
          )
        if (23 < t[0])
          return (
            console.error(
              "add-to-calendar button generation failed: time misspelled - hours number too high [" +
                e +
                ": " +
                t[0] +
                "]"
            ),
            !1
          )
        if (59 < t[1])
          return (
            console.error(
              "add-to-calendar button generation failed: time misspelled - minutes number too high [" +
                e +
                ": " +
                t[1] +
                "]"
            ),
            !1
          )
        "startTime" == e &&
          (o.startDate = new Date(
            o.startDate.getTime() + 36e5 * t[0] + 6e4 * t[1]
          )),
          "endTime" == e &&
            (o.endDate = new Date(
              o.endDate.getTime() + 36e5 * t[0] + 6e4 * t[1]
            ))
      }
      return !0
    }) &&
    ((null != a.startTime && null == a.endTime) ||
    (null == a.startTime && null != a.endTime)
      ? (console.error(
          "add-to-calendar button generation failed: if you set a starting time, you also need to define an end time"
        ),
        !1)
      : o.endDate < o.startDate
      ? (console.error(
          "add-to-calendar button generation failed: end date before start date"
        ),
        !1)
      : !(
          null != a.recurrence &&
          "" != a.recurrence &&
          !/^[\w=;:*+-/\\]+$/.test(a.recurrence)
        ) ||
        (console.error(
          "add-to-calendar button generation failed: RRULE data misspelled"
        ),
        !1))
  )
}
function atcb_generate_label(t, a, e, n = !1, o = "", c = !1) {
  var l = atcb_translate_hook("Add to Calendar", t.language, t)
  switch ((c && "" == o && (o = l), e)) {
    case "trigger":
    default:
      "click" === t.trigger
        ? a.addEventListener(
            "click",
            atcb_debounce_leading((e) => {
              e.preventDefault(), atcb_toggle("auto", t, a, !1, !0)
            })
          )
        : (a.addEventListener(
            "touchstart",
            atcb_debounce_leading((e) => {
              e.preventDefault(), atcb_toggle("auto", t, a, !1, !0)
            })
          ),
          a.addEventListener(
            "mouseenter",
            atcb_debounce_leading((e) => {
              e.preventDefault(), atcb_toggle("open", t, a, !1, !0)
            })
          )),
        (a.id = t.identifier),
        (o = o || l)
      break
    case "apple":
      a.addEventListener(
        "click",
        atcb_debounce(() => {
          c ? a.blur() : atcb_toggle("close"), atcb_generate_ical(t)
        })
      ),
        (a.id = t.identifier + "-apple"),
        (o = o || "Apple")
      break
    case "google":
      a.addEventListener(
        "click",
        atcb_debounce(() => {
          c ? a.blur() : atcb_toggle("close"), atcb_generate_google(t)
        })
      ),
        (a.id = t.identifier + "-google"),
        (o = o || "Google")
      break
    case "ical":
      a.addEventListener(
        "click",
        atcb_debounce(() => {
          c ? a.blur() : atcb_toggle("close"), atcb_generate_ical(t)
        })
      ),
        (a.id = t.identifier + "-ical"),
        (o = o || atcb_translate_hook("iCal File", t.language, t))
      break
    case "msteams":
      a.addEventListener(
        "click",
        atcb_debounce(() => {
          c ? a.blur() : atcb_toggle("close"), atcb_generate_teams(t)
        })
      ),
        (a.id = t.identifier + "-msteams"),
        (o = o || "Microsoft Teams")
      break
    case "ms365":
      a.addEventListener(
        "click",
        atcb_debounce(() => {
          c ? a.blur() : atcb_toggle("close"), atcb_generate_microsoft(t, "365")
        })
      ),
        (a.id = t.identifier + "-ms365"),
        (o = o || "Microsoft 365")
      break
    case "outlookcom":
      a.addEventListener(
        "click",
        atcb_debounce(() => {
          c ? a.blur() : atcb_toggle("close"),
            atcb_generate_microsoft(t, "outlook")
        })
      ),
        (a.id = t.identifier + "-outlook"),
        (o = o || "Outlook.com")
      break
    case "yahoo":
      a.addEventListener(
        "click",
        atcb_debounce(() => {
          c ? a.blur() : atcb_toggle("close"), atcb_generate_yahoo(t)
        })
      ),
        (a.id = t.identifier + "-yahoo"),
        (o = o || "Yahoo")
      break
    case "close":
      a.addEventListener(
        "click",
        atcb_debounce(() => {
          c ? a.blur() : atcb_toggle("close")
        })
      ),
        a.addEventListener(
          "focus",
          atcb_debounce(() => atcb_close(!1))
        ),
        (a.id = t.identifier + "-close"),
        (o = atcb_translate_hook("Close", t.language, t))
  }
  if (
    (c && (a.id = t.identifier),
    c || "trigger" !== e
      ? a.addEventListener(
          "keyup",
          atcb_debounce_leading((e) => {
            "Enter" == e.key && (e.preventDefault(), a.click())
          })
        )
      : a.addEventListener(
          "keyup",
          atcb_debounce_leading((e) => {
            "Enter" == e.key &&
              (e.preventDefault(), atcb_toggle("auto", t, a, !0, !0))
          })
        ),
    n)
  ) {
    const r = document.createElement("span")
    r.classList.add("atcb-icon"),
      (r.innerHTML = atcbIcon["" + e]),
      a.appendChild(r)
  }
  const i = document.createElement("span")
  i.classList.add("atcb-text"), (i.textContent = o), a.appendChild(i)
}
function atcb_generate(e, t) {
  if (((e.textContent = ""), t.name && t.location && t.startDate)) {
    const c = document.createElement("script")
    ;(c.type = "application/ld+json"),
      (c.textContent =
        '{ "event": { "@context":"https://schema.org", "@type":"Event", '),
      (c.textContent += '"name":"' + t.name + '", '),
      t.descriptionHtmlFree &&
        (c.textContent += '"description":"' + t.descriptionHtmlFree + '", ')
    var a = atcb_generate_time(t, "delimiters", "general", !0)
    ;(c.textContent += '"startDate":"' + a.start + '", '),
      (c.textContent += '"endDate":"' + a.end + '", '),
      t.location.startsWith("http")
        ? ((c.textContent +=
            '"eventAttendanceMode":"https://schema.org/OnlineEventAttendanceMode", '),
          (c.textContent +=
            '"location": { "@type":"VirtualLocation", "url":"' +
            t.location +
            '" } '))
        : (c.textContent += '"location":"' + t.location + '" '),
      (c.textContent += "} }"),
      e.appendChild(c)
  }
  const n = document.createElement("div"),
    o =
      (n.classList.add("atcb-button-wrapper"),
      n.classList.add("atcb-" + t.lightMode),
      (n.style.fontSize = t.size + "px"),
      e.appendChild(n),
      document.createElement("button"))
  if (
    (o.classList.add("atcb-button"),
    "overlay" === t.listStyle && o.classList.add("atcb-dropoverlay"),
    (o.type = "button"),
    n.appendChild(o),
    1 === t.options.length)
  ) {
    a = t.options[0].split("|")
    o.classList.add("atcb-single"),
      atcb_generate_label(t, o, a[0], !0, t.label, !0)
  } else {
    atcb_generate_label(t, o, "trigger", !0, t.label)
    const l = document.createElement("div")
    l.classList.add("atcb-dropdown-anchor"), o.appendChild(l)
  }
  e.classList.remove("atcb"),
    e.classList.add("atcb-initialized"),
    t.inline ? (e.style.display = "inline-block") : (e.style.display = "block"),
    console.log('add-to-calendar button "' + t.identifier + '" created')
}
function atcb_generate_dropdown_list(a) {
  const n = document.createElement("div")
  n.classList.add("atcb-list"),
    n.classList.add("atcb-" + a.lightMode),
    (n.style.fontSize = a.size + "px")
  let o = 0
  if (
    (a.options.forEach(function (e) {
      e = e.split("|")
      if (
        null == a.recurrence ||
        "" == a.recurrence ||
        ("msteams" != e[0] &&
          "ms365" != e[0] &&
          "outlookcom" != e[0] &&
          "yahoo" != e[0])
      ) {
        const t = document.createElement("div")
        t.classList.add("atcb-list-item"),
          (t.tabIndex = 0),
          o++,
          (t.dataset.optionNumber = o),
          n.appendChild(t),
          atcb_generate_label(a, t, e[0], !0, e[1])
      }
    }),
    "modal" === a.listStyle)
  ) {
    const e = document.createElement("div")
    e.classList.add("atcb-list-item", "atcb-list-item-close"),
      (e.tabIndex = 0),
      n.appendChild(e),
      atcb_generate_label(a, e, "close", !0)
  }
  return n
}
function atcb_generate_bg_overlay(e = "dropdown", t = "", a = !0) {
  const n = document.createElement("div")
  ;(n.id = "atcb-bgoverlay"),
    "modal" !== e && a && n.classList.add("atcb-animate-bg"),
    a || n.classList.add("atcb-no-bg"),
    (n.tabIndex = 0),
    n.addEventListener(
      "click",
      atcb_debounce((e) => {
        e.target === e.currentTarget && atcb_toggle("close")
      })
    )
  let o = !1
  return (
    n.addEventListener(
      "touchstart",
      atcb_debounce_leading(() => (o = !1)),
      { passive: !0 }
    ),
    n.addEventListener(
      "touchmove",
      atcb_debounce_leading(() => (o = !0)),
      { passive: !0 }
    ),
    n.addEventListener(
      "touchend",
      atcb_debounce((e) => {
        !1 === o && e.target === e.currentTarget && atcb_toggle("close")
      }),
      { passive: !0 }
    ),
    n.addEventListener(
      "focus",
      atcb_debounce_leading((e) => {
        e.target === e.currentTarget && atcb_toggle("close")
      })
    ),
    "click" !== t
      ? n.addEventListener(
          "mousemove",
          atcb_debounce_leading((e) => {
            e.target === e.currentTarget && atcb_toggle("close")
          })
        )
      : n.classList.add("atcb-click"),
    n
  )
}
function atcb_toggle(e, t = "", a = "", n = !1, o = !1) {
  "open" != e &&
  ("close" == e ||
    a.classList.contains("atcb-active") ||
    document.querySelector(".atcb-active-modal"))
    ? atcb_close(n)
    : atcb_open(t, a, n, o)
}
function atcb_open(e, t, a = !1, n = !1) {
  if (
    !document.querySelector(".atcb-list") &&
    !document.querySelector(".atcb-modal")
  ) {
    const o = atcb_generate_dropdown_list(e),
      c = document.createElement("div"),
      l =
        (c.classList.add("atcb-list-wrapper"),
        t
          ? (t.classList.add("atcb-active"),
            "modal" === e.listStyle
              ? (t.classList.add("atcb-modal-style"),
                o.classList.add("atcb-modal"))
              : (c.appendChild(o),
                c.classList.add("atcb-dropdown"),
                "overlay" === e.listStyle &&
                  c.classList.add("atcb-dropoverlay")),
            n && o.classList.add("atcb-generated-button"))
          : o.classList.add("atcb-modal"),
        atcb_generate_bg_overlay(e.listStyle, e.trigger, e.background))
    "modal" === e.listStyle
      ? (document.body.appendChild(l),
        l.appendChild(o),
        document.body.classList.add("atcb-modal-no-scroll"))
      : (document.body.appendChild(c),
        c.appendChild(o),
        document.body.appendChild(l),
        "dropdown-static" === e.listStyle
          ? atcb_position_list(t, c, !0)
          : atcb_position_list(t, c)),
      atcb_set_fullsize(l),
      a ? o.firstChild.focus() : o.firstChild.focus({ preventScroll: !0 }),
      o.firstChild.blur()
  }
}
function atcb_close(e = !1) {
  let t = document.querySelector(".atcb-active, .atcb-active-modal")
  t && (t.focus({ preventScroll: !0 }), e || t.blur()),
    Array.from(document.querySelectorAll(".atcb-active")).forEach((e) => {
      e.classList.remove("atcb-active")
    }),
    Array.from(document.querySelectorAll(".atcb-active-modal")).forEach((e) => {
      e.classList.remove("atcb-active-modal")
    }),
    document.body.classList.remove("atcb-modal-no-scroll"),
    Array.from(document.querySelectorAll(".atcb-list-wrapper"))
      .concat(Array.from(document.querySelectorAll(".atcb-list")))
      .concat(Array.from(document.querySelectorAll(".atcb-info-modal")))
      .concat(Array.from(document.querySelectorAll("#atcb-bgoverlay")))
      .forEach((e) => e.remove())
}
function atcb_action(e, t, a = !0) {
  if (!atcb_check_required((e = atcb_seure_content(e))))
    throw new Error("data missing; see logs")
  if (!atcb_validate((e = atcb_decorate_data(e))))
    throw new Error("Invalid data; see logs")
  t
    ? ((e.identifier = t.id),
      "modal" != e.listStyle && (e.listStyle = "overlay"))
    : ((e.identifier = "atcb-btn-custom"),
      (e.listStyle = "modal"),
      (e.trigger = "click")),
    atcb_toggle("open", e, t, a)
}
function atcb_generate_google(e) {
  let t = "https://calendar.google.com/calendar/render?action=TEMPLATE"
  var a = atcb_generate_time(e, "clean", "google")
  ;(t +=
    "&dates=" +
    encodeURIComponent(a.start) +
    "%2F" +
    encodeURIComponent(a.end)),
    null != e.name &&
      "" != e.name &&
      (t += "&text=" + encodeURIComponent(e.name))
  let n = ""
  null != e.description && "" != e.description && (n = e.description),
    null != e.location &&
      "" != e.location &&
      ((t += "&location=" + encodeURIComponent(e.location)),
      isiOS() &&
        ("" != n && (n += "<br><br>"), (n += "&#128205;: " + e.location))),
    "" != n && (t += "&details=" + encodeURIComponent(n)),
    null != e.recurrence &&
      "" != e.recurrence &&
      (t += "&recur=" + encodeURIComponent(e.recurrence)),
    atcb_secure_url(t) && window.open(t, atcbDefaultTarget).focus()
}
function atcb_generate_yahoo(e) {
  let t = "https://calendar.yahoo.com/?v=60"
  var a = atcb_generate_time(e, "clean")
  ;(t +=
    "&st=" + encodeURIComponent(a.start) + "&et=" + encodeURIComponent(a.end)),
    a.allday && (t += "&dur=allday"),
    null != e.name &&
      "" != e.name &&
      (t += "&title=" + encodeURIComponent(e.name)),
    null != e.location &&
      "" != e.location &&
      (t += "&in_loc=" + encodeURIComponent(e.location)),
    null != e.descriptionHtmlFree &&
      "" != e.descriptionHtmlFree &&
      (t += "&desc=" + encodeURIComponent(e.descriptionHtmlFree)),
    atcb_secure_url(t) && window.open(t, atcbDefaultTarget).focus()
}
function atcb_generate_microsoft(t, a = "365") {
  if (isMobile()) atcb_generate_ical(t)
  else {
    let e = "https://"
    e =
      e +
      ("outlook" == a ? "outlook.live.com" : "outlook.office.com") +
      "/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent"
    a = atcb_generate_time(t, "delimiters", "microsoft")
    ;(e +=
      "&startdt=" +
      encodeURIComponent(a.start) +
      "&enddt=" +
      encodeURIComponent(a.end)),
      a.allday && (e += "&allday=true"),
      null != t.name &&
        "" != t.name &&
        (e += "&subject=" + encodeURIComponent(t.name)),
      null != t.location &&
        "" != t.location &&
        (e += "&location=" + encodeURIComponent(t.location)),
      null != t.description &&
        "" != t.description &&
        (e +=
          "&body=" + encodeURIComponent(t.description.replace(/\n/g, "<br>"))),
      atcb_secure_url(e) && window.open(e, atcbDefaultTarget).focus()
  }
}
function atcb_generate_teams(e) {
  let t = "https://teams.microsoft.com/l/meeting/new?"
  var a = atcb_generate_time(e, "delimiters", "microsoft")
  t +=
    "&startTime=" +
    encodeURIComponent(a.start) +
    "&endTime=" +
    encodeURIComponent(a.end)
  let n = ""
  null != e.name &&
    "" != e.name &&
    (t += "&subject=" + encodeURIComponent(e.name)),
    null != e.location &&
      "" != e.location &&
      ((n = encodeURIComponent(e.location)),
      (t += "&location=" + n),
      (n += " // ")),
    null != e.descriptionHtmlFree &&
      "" != e.descriptionHtmlFree &&
      (t += "&content=" + n + encodeURIComponent(e.descriptionHtmlFree)),
    atcb_secure_url(t) && window.open(t, atcbDefaultTarget).focus()
}
function atcb_generate_ical(n) {
  if (
    null == n.icsFile ||
    "" == n.icsFile ||
    !atcb_secure_url(n.icsFile) ||
    !n.icsFile.startsWith("https://") ||
    (isiOS() && isWebView())
  ) {
    let e = new Date()
    e = e.toISOString()
    var o = atcb_generate_time(n, "clean", "ical")
    let t = ""
    o.allday && (t = ";VALUE=DATE")
    const d = ["BEGIN:VCALENDAR", "VERSION:2.0"]
    d.push(
      "PRODID:-// github.com/add2cal/add-to-calendar-button // atcb v" +
        atcbVersion +
        " //EN"
    ),
      d.push("CALSCALE:GREGORIAN"),
      d.push("BEGIN:VEVENT"),
      d.push("UID:" + e + "@add-to-calendar-button"),
      d.push(
        "DTSTAMP:" + o.start,
        "DTSTART" + t + ":" + o.start,
        "DTEND" + t + ":" + o.end,
        "SUMMARY:" + n.name.replace(/.{65}/g, "$&\r\n ")
      ),
      null != n.descriptionHtmlFree &&
        "" != n.descriptionHtmlFree &&
        d.push(
          "DESCRIPTION:" +
            n.descriptionHtmlFree
              .replace(/\n/g, "\\n")
              .replace(/.{60}/g, "$&\r\n ")
        ),
      null != n.description &&
        "" != n.description &&
        d.push(
          'X-ALT-DESC;FMTTYPE=text/html:\r\n <!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 3.2//EN"">\r\n <HTML><BODY>\r\n ' +
            n.description.replace(/\n/g, "<br>").replace(/.{60}/g, "$&\r\n ") +
            "\r\n </BODY></HTML>"
        ),
      null != n.location &&
        "" != n.location &&
        d.push("LOCATION:" + n.location),
      null != n.recurrence && "" != n.recurrence && d.push(n.recurrence),
      (e = e.replace(/\.\d{3}/g, "").replace(/[^a-z\d]/gi, "")),
      d.push(
        "STATUS:CONFIRMED",
        "LAST-MODIFIED:" + e,
        "SEQUENCE:0",
        "END:VEVENT",
        "END:VCALENDAR"
      )
    let a =
      "data:text/calendar;charset=utf-8," + encodeURIComponent(d.join("\r\n"))
    o = n.iCalFileName || "event-to-save-in-my-calendar"
    if (
      (null != n.icsFile &&
        "" != n.icsFile &&
        atcb_secure_url(n.icsFile) &&
        n.icsFile.startsWith("https://") &&
        (a = n.icsFile),
      isWebView() && (isiOS() || (isAndroid() && isProblematicWebView())))
    ) {
      const u = document.createElement("input")
      document.body.appendChild(u)
      var c,
        l,
        i = u.contentEditable,
        r = u.readOnly
      ;(u.value = a),
        (u.contentEditable = !0),
        (u.readOnly = !1),
        isiOS()
          ? ((c = document.createRange()).selectNodeContents(u),
            (l = window.getSelection()).removeAllRanges(),
            l.addRange(c),
            u.setSelectionRange(0, 999999))
          : (navigator.clipboard.writeText(a), u.select()),
        (u.contentEditable = i),
        (u.readOnly = r),
        document.execCommand("copy"),
        u.remove(),
        atcb_create_modal(
          n,
          "browser",
          atcb_translate_hook("WebView iCal", n.language, n),
          atcb_translate_hook("WebView info description", n.language, n)
        )
    } else
      try {
        if (window.ActiveXObject) {
          if (window.ActiveXObject && document.execCommand) {
            const b = window.open(a, atcbDefaultTarget)
            b.document.close(),
              b.document.execCommand("SaveAs", !0, o || a),
              b.close()
          }
        } else {
          const p = document.createElement("a")
          ;(p.href = a), (p.target = atcbDefaultTarget), (p.download = o)
          var s = new MouseEvent("click", {
            view: window,
            button: 0,
            bubbles: !0,
            cancelable: !1,
          })
          p.dispatchEvent(s),
            (window.URL || window.webkitURL).revokeObjectURL(p.href)
        }
      } catch (e) {
        console.error(e)
      }
  } else window.open(n.icsFile, atcbDefaultTarget)
}
function atcb_generate_time(l, a = "delimiters", n = "general", e = !1) {
  var o = l.startDate.split("-"),
    c = l.endDate.split("-")
  let i = "",
    r = "",
    s = !1
  if (null != l.startTime && null != l.endTime) {
    if (null != l.timeZoneOffset && "" != l.timeZoneOffset)
      (i = new Date(
        o[0] +
          "-" +
          o[1] +
          "-" +
          o[2] +
          "T" +
          l.startTime +
          ":00.000" +
          l.timeZoneOffset
      )),
        (r = new Date(
          c[0] +
            "-" +
            c[1] +
            "-" +
            c[2] +
            "T" +
            l.endTime +
            ":00.000" +
            l.timeZoneOffset
        ))
    else if (
      ((i = new Date(
        o[0] + "-" + o[1] + "-" + o[2] + "T" + l.startTime + ":00.000+00:00"
      )),
      (r = new Date(
        c[0] + "-" + c[1] + "-" + c[2] + "T" + l.endTime + ":00.000+00:00"
      )),
      null != l.timeZone && "" != l.timeZone)
    ) {
      const d = new Date(i.toLocaleString("en-US", { timeZone: "UTC" })),
        u =
          ("currentBrowser" == l.timeZone &&
            (l.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone),
          new Date(i.toLocaleString("en-US", { timeZone: l.timeZone })))
      var t = d.getTime() - u.getTime()
      i.setTime(i.getTime() + t), r.setTime(r.getTime() + t)
    }
    if (
      ((i = i.toISOString().replace(".000", "")),
      (r = r.toISOString().replace(".000", "")),
      "clean" == a &&
        ((i = i.replace(/-/g, "").replace(/:/g, "")),
        (r = r.replace(/-/g, "").replace(/:/g, ""))),
      e)
    ) {
      let o = "",
        c = ""
      if (null != l.timeZoneOffset && "" != l.timeZoneOffset)
        (o = l.timeZoneOffset), (c = l.timeZoneOffset)
      else if (null != l.timeZone && "" != l.timeZone) {
        let e = new Date(i.toLocaleString("sv", { timeZone: l.timeZone })),
          t = e.toString().match(/GMT(.{5})/g),
          a =
            ((o = t[0].replace(/GMT(.{3})(.{2})/g, "$1:$2")),
            new Date(r.toLocaleString("sv", { timeZone: l.timeZone }))),
          n = a.toString().match(/GMT(.{5})/g)
        c = n[0].replace(/GMT(.{3})(.{2})/g, "$1:$2")
      }
      ;(i = i.slice(0, -1) + o), (r = r.slice(0, -1) + c)
    }
  } else {
    s = !0
    let e = (i = new Date(Date.UTC(o[0], o[1] - 1, o[2])))
        .toISOString()
        .replace(/T(.+)Z/g, ""),
      t =
        ((r = new Date(Date.UTC(c[0], c[1] - 1, c[2]))),
        ("google" != n && "microsoft" != n && "ical" != n) ||
          r.setDate(r.getDate() + 1),
        r.toISOString().replace(/T(.+)Z/g, ""))
    "clean" == a && ((e = e.replace(/-/g, "")), (t = t.replace(/-/g, ""))),
      (i = e),
      (r = t)
  }
  return { start: i, end: r, allday: s }
}
function atcb_seure_content(e, t = !0) {
  let a
  return (
    (a = (a = t ? JSON.stringify(e) : e).replace(/(<(?!br)([^>]+)>)/gi, "")),
    t ? JSON.parse(a) : a
  )
}
function atcb_secure_url(e, t = !0) {
  return (
    !e.match(
      /((\.\.\/)|(\.\.\\)|(%2e%2e%2f)|(%252e%252e%252f)|(%2e%2e\/)|(%252e%252e\/)|(\.\.%2f)|(\.\.%252f)|(%2e%2e%5c)|(%252e%252e%255c)|(%2e%2e\\)|(%252e%252e\\)|(\.\.%5c)|(\.\.%255c)|(\.\.%c0%af)|(\.\.%25c0%25af)|(\.\.%c1%9c)|(\.\.%25c1%259c))/gi
    ) ||
    (t &&
      console.error(
        "Seems like the generated URL includes at least one security issue and got blocked. Please check the calendar button parameters!"
      ),
    !1)
  )
}
function atcb_rewrite_html_elements(e, t = !1) {
  return (
    (e = e.replace(/<br\s*\/?>/gi, "\n")),
    (e = t
      ? e.replace(
          /\[(|\/)(url|br|hr|p|b|strong|u|i|em|li|ul|ol|h\d)\]|((\|.*)\[\/url\])/gi,
          ""
        )
      : (e = e.replace(
          /\[(\/|)(br|hr|p|b|strong|u|i|em|li|ul|ol|h\d)\]/gi,
          "<$1$2>"
        )).replace(
          /\[url\]([\w&$+.,:;=~!*'?@^%#|\s\-()/]*)\[\/url\]/gi,
          function (e, t) {
            t = t.split("|")
            let a =
              '<a href="' +
              t[0] +
              '" target="' +
              atcbDefaultTarget +
              '" rel="noopener">'
            return (
              1 < t.length && "" != t[1] ? (a += t[1]) : (a += t[0]), a + "</a>"
            )
          }
        ))
  )
}
function atcb_create_modal(n, e = "", t, a, o) {
  const c = atcb_generate_bg_overlay("modal", "click"),
    l = document.createElement("div"),
    i =
      (l.classList.add("atcb-modal", "atcb-info-modal"),
      (l.tabIndex = 0),
      c.appendChild(l),
      document.body.appendChild(c),
      document.body.classList.add("atcb-modal-no-scroll"),
      document.getElementById(n.identifier)),
    r =
      (null != i && i.classList.add("atcb-active-modal"),
      document.createElement("div")),
    s =
      (r.classList.add("atcb-modal-box"),
      r.classList.add("atcb-" + n.lightMode),
      (r.style.fontSize = n.size + "px"),
      l.appendChild(r),
      atcb_set_fullsize(c),
      document.createElement("div")),
    d =
      (s.classList.add("atcb-modal-close"),
      (s.innerHTML = atcbIcon.close),
      r.appendChild(s),
      s.addEventListener(
        "click",
        atcb_debounce(() => atcb_close())
      ),
      s.addEventListener(
        "keyup",
        atcb_debounce_leading((e) => {
          "Enter" == e.key &&
            (e.preventDefault(), atcb_toggle("close", "", "", !0))
        })
      ),
      (null != o && 0 != o.length) || ((s.tabIndex = 0), s.focus()),
      document.createElement("div"))
  if ((d.classList.add("atcb-modal-headline"), r.appendChild(d), "" != e)) {
    const b = document.createElement("span")
    b.classList.add("atcb-modal-headline-icon"),
      (b.innerHTML = atcbIcon["" + e]),
      d.appendChild(b)
  }
  e = document.createTextNode(t)
  d.appendChild(e)
  const u = document.createElement("div")
  if (
    (u.classList.add("atcb-modal-content"),
    (u.innerHTML = a),
    r.appendChild(u),
    null != o && 0 < o.length)
  ) {
    const p = document.createElement("div")
    p.classList.add("atcb-modal-buttons"),
      r.appendChild(p),
      o.forEach((e, t) => {
        let a
        null != e.href && "" != e.href
          ? ((a = document.createElement("a")).setAttribute(
              "target",
              atcbDefaultTarget
            ),
            a.setAttribute("href", e.href),
            a.setAttribute("rel", "noopener"))
          : ((a = document.createElement("button")).type = "button"),
          a.classList.add("atcb-modal-btn"),
          e.primary && a.classList.add("atcb-modal-btn-primary"),
          (null != e.label && "" != e.label) ||
            (e.label = atcb_translate_hook("Click me", n.language, n)),
          (a.textContent = e.label),
          p.appendChild(a),
          0 == t && a.focus(),
          "close" !== e.type
            ? (a.addEventListener(
                "click",
                atcb_debounce(() => atcb_close())
              ),
              a.addEventListener(
                "keyup",
                atcb_debounce((e) => {
                  "Enter" == e.key && atcb_toggle("close", "", "", !0)
                })
              ))
            : (a.addEventListener(
                "click",
                atcb_debounce(() => atcb_close())
              ),
              a.addEventListener(
                "keyup",
                atcb_debounce_leading((e) => {
                  "Enter" == e.key &&
                    (e.preventDefault(), atcb_toggle("close", "", "", !0))
                })
              ))
      })
  }
}
function atcb_position_list(e, t, a = !1, n = !1) {
  let o = !1
  const c = e
  null !== e.querySelector(".atcb-dropdown-anchor") &&
    ((e = e.querySelector(".atcb-dropdown-anchor")), (o = !0))
  let l = e.getBoundingClientRect(),
    i = t.getBoundingClientRect()
  var r,
    s = c.getBoundingClientRect()
  !0 !== o || t.classList.contains("atcb-dropoverlay")
    ? ((r = l.width + 20 + "px"),
      (t.style.minWidth = r),
      (i = t.getBoundingClientRect()),
      (t.style.top =
        window.scrollY + s.top + s.height / 2 - i.height / 2 + "px"),
      (t.style.left = l.left - (i.width - l.width) / 2 + "px"))
    : ((r = document.documentElement.clientHeight),
      (t.classList.contains("atcb-dropup") && n) ||
      (!a &&
        l.top + i.height > r - 20 &&
        20 < 2 * s.top + s.height - l.top - i.height)
        ? (c.classList.add("atcb-dropup"),
          t.classList.add("atcb-dropup"),
          (t.style.bottom =
            2 * r -
            (r + (s.top + (s.top + s.height - l.top))) -
            window.scrollY +
            "px"))
        : ((t.style.top = window.scrollY + l.top + "px"),
          c.classList.contains("atcb-dropup") &&
            c.classList.remove("atcb-dropup")),
      (l = e.getBoundingClientRect()),
      (t.style.width = l.width + "px"),
      (t.style.left = l.left + "px"))
}
function atcb_set_fullsize(e) {
  ;(e.style.width = window.innerWidth + "px"),
    (e.style.height = window.innerHeight + 100 + "px")
}
function atcb_debounce(t, a = 200) {
  let n
  return (...e) => {
    clearTimeout(n),
      (n = setTimeout(() => {
        t.apply(this, e)
      }, a))
  }
}
function atcb_debounce_leading(t, a = 300) {
  let n
  return (...e) => {
    n || t.apply(this, e),
      clearTimeout(n),
      (n = setTimeout(() => {
        n = void 0
      }, a))
  }
}
function atcb_throttle(n, o = 10) {
  let c,
    l = null,
    i = 0,
    r = (...e) => {
      ;(i = Date.now()), (l = null), (c = n.apply(this, e))
    }
  return (...e) => {
    var t = Date.now(),
      a = o - (t - i)
    return (
      a <= 0 || o < a
        ? (l && (clearTimeout(l), (l = null)), (i = t), (c = n.apply(this, e)))
        : (l = l || setTimeout(r, a)),
      c
    )
  }
}
function atcb_translate_hook(e, t, a) {
  var n = e.replace(/\s+/g, "").toLowerCase()
  return null != a.customLabels &&
    null != a.customLabels["" + n] &&
    "" != a.customLabels["" + n]
    ? atcb_rewrite_html_elements(a.customLabels["" + n])
    : atcb_translate(e, t)
}
function atcb_translate(e, t) {
  switch (t) {
    case "en":
    default:
      switch (e) {
        case "Add to Calendar":
          return "Add to Calendar"
        case "iCal File":
          return "iCal File"
        case "Close":
          return "Close"
        case "Close Selection":
          return "Close Selection"
        case "Click me":
          return "Click me"
        case "WebView iCal":
          return "Open your browser"
        case "WebView info description":
          return "Unfortunately, in-app browsers have problems with the way we generate the calendar file.<br>We automatically put a magical URL into your phone's clipboard.<br><ol><li><strong>Open any other browser</strong> on your phone, ...</li><li><strong>Paste</strong> the clipboard content and go."
      }
      break
    case "de":
      switch (e) {
        case "Add to Calendar":
          return "Im Kalender speichern"
        case "iCal File":
          return "iCal-Datei"
        case "Close":
          return "Schlie??en"
        case "Close Selection":
          return "Auswahl schlie??en"
        case "Click me":
          return "Klick mich"
        case "WebView iCal":
          return "??ffne deinen Browser"
        case "WebView info description":
          return "Leider haben In-App-Browser Probleme mit der Art, wie wir Kalender-Dateien erzeugen.<br>Wir haben automatisch eine magische URL in die Zwischenablage deines Smartphones kopiert.<br><ol><li><strong>??ffne einen anderen Browser</strong> auf deinem Smartphone, ...</li><li>Nutze die <strong>Einf??gen</strong>-Funktion, um fortzufahren."
      }
  }
  return e
}
isBrowser() &&
  (document.addEventListener(
    "keyup",
    atcb_debounce_leading((e) => {
      "Escape" === e.key && atcb_toggle("close", "", "", !0)
    })
  ),
  document.addEventListener("keydown", (a) => {
    if (
      document.querySelector(".atcb-list") &&
      ("ArrowDown" === a.key || "ArrowUp" === a.key || "Tab" === a.key)
    ) {
      let e = 0,
        t = document.activeElement
      var n = document.querySelectorAll(".atcb-list-item").length
      t.classList.contains("atcb-list-item")
        ? ("ArrowDown" === a.key && t.dataset.optionNumber < n
            ? (a.preventDefault(), (e = parseInt(t.dataset.optionNumber) + 1))
            : "ArrowUp" === a.key &&
              1 <= t.dataset.optionNumber &&
              (a.preventDefault(), (e = parseInt(t.dataset.optionNumber) - 1)),
          0 < e &&
            document
              .querySelector('.atcb-list-item[data-option-number="' + e + '"]')
              .focus())
        : (a.preventDefault(),
          (!document.querySelector(".atcb-list-wrapper.atcb-dropup") ||
          ("ArrowDown" !== a.key && "ArrowUp" !== a.key)
            ? document.querySelector('.atcb-list-item[data-option-number="1"]')
            : document.querySelector(
                '.atcb-list-item[data-option-number="' + n + '"]'
              )
          ).focus())
    }
  }),
  window.addEventListener(
    "resize",
    atcb_throttle(() => {
      var e = document.getElementById("atcb-bgoverlay"),
        e =
          (null != e && atcb_set_fullsize(e),
          document.querySelector(".atcb-active")),
        t = document.querySelector(".atcb-dropdown")
      null != e && null != t && atcb_position_list(e, t, !1, !0)
    })
  )),
  isBrowser() &&
    ("loading" !== document.readyState
      ? atcb_init()
      : document.addEventListener("DOMContentLoaded", atcb_init, !1))
//# sourceMappingURL=atcb.min.js.map
