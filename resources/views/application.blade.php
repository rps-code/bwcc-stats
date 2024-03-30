<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
	<link rel="icon" href="{{ asset('favicon.ico') }}" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>BWCC Stats</title>
	<link rel="stylesheet" type="text/css" href="{{ asset('loader.css') }}" />
	@vite(['resources/ts/main.ts'])
</head>

<body>
	<div id="app">
		<div id="loading-bg">
			<div class=" loading">
				<div class="effect-1 effects"></div>
				<div class="effect-2 effects"></div>
				<div class="effect-3 effects"></div>
			</div>
		</div>
	</div>

<script>
    const loaderColor = localStorage.getItem('vuexy-initial-loader-bg') || '#FFFFFF'
    const primaryColor = localStorage.getItem('vuexy-initial-loader-color') || '#7367F0'

    if (loaderColor)
		document.documentElement.style.setProperty('--initial-loader-bg', loaderColor)
    if (loaderColor)
		document.documentElement.style.setProperty('--initial-loader-bg', loaderColor)

    if (primaryColor)
		document.documentElement.style.setProperty('--initial-loader-color', primaryColor)
</script>

</body>
</html>