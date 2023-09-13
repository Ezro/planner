<script lang="ts">
  import type { ActionData } from './$types'

  export let form: ActionData
</script>

<div class="shared-submit-form">
  <h1>Login</h1>
  <form action="?/login" method="POST">
    <div>
      <label for="username">Username</label>
      <input id="username" name="username" type="text" required />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required />
    </div>
    {#if form?.invalid}
      <p class="error">Username and password is required.</p>
    {/if}
    {#if form?.credentials}
      <p class="error">You have entered the wrong credentials.</p>
    {/if}
    <button type="submit">Log in</button>
  </form>
  <!-- TODO: Support OAuth -->
  <!-- <hr style="width: 25%; margin: 15px 0 15px 0" />
  <div class="flex justify-center space-x-2">
    <form class="auth-form" method="post" action="/oauth_begin">
      <button type="submit">
        <img
          src="/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png"
          alt="Google Sign In"
        /></button
      >
    </form>
    <form class="auth-form" method="post" action="/oauth_begin">
      <button type="submit">
        <img
          src="/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png"
          alt="Google Sign In"
        /></button
      >
    </form>
    <form class="auth-form" method="post" action="/oauth_begin">
      <button type="submit">
        <img
          src="/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png"
          alt="Google Sign In"
        /></button
      >
    </form>
  </div> -->
</div>

<style>
  @import '../../styles/shared.css';
</style>
