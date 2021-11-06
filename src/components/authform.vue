<template>
  <div class="">
    <div
      class="flex flex-col w-full max-w-sm p-8 mx-auto my-10 text-left border"
    >
      <div>{{ this.$route.name }}</div>
      <label>Username </label>
      <input
        @change="submitted = false"
        autocomplete="username"
        class="p-2 border"
        type="text"
        v-model="form.username"
        placeholder="Username"
        name="username"
        required
      />
      <label>Password </label>
      <div class="relative flex items-center justify-end">
        <button @click="togglePasswordVisibility()" class="absolute mx-4">
          <font-awesome-icon v-if="!passwordVisible" icon="eye" />
          <font-awesome-icon v-if="passwordVisible" icon="eye-slash" />
        </button>

        <input
          @change="submitted = false"
          autocomplete="current-password"
          class="w-full p-2 pr-12 border"
          :type="passwordVisible ? 'text' : 'password'"
          v-model="form.password"
          placeholder=" Password"
          name="password"
          required
        />
      </div>

      <button class="px-6 py-2 mt-4 border" @click="submit()">
        {{ this.$route.name }}
      </button>

      <div v-if="submitted & passwordValidation.errors.length">
        <h2>Hints</h2>
        <p
          class="text-red-500"
          v-for="(error, index) in passwordValidation.errors"
          :key="index"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const form = {
  username: "",
  password: "",
};
export default {
  name: "AuthForm",
  data() {
    return {
      rules: [
        // { message: "One lowercase letter required.", regex: /[a-z]+/ },
        // { message: "One uppercase letter required.", regex: /[A-Z]+/ },
        //	{ message:"One number required.", regex:/[0-9]+/ }
        { message: "password: minimum 8 characters required", regex: /.{8,}/ },
      ],
      passwordVisible: false,
      submitted: false,
      form: JSON.parse(JSON.stringify(form)),
    };
  },

  computed: {
    passwordValidation() {
      let errors = [];
      for (let condition of this.rules) {
        if (!condition.regex.test(this.form.password)) {
          errors.push(condition.message);
        }
      }
      if (errors.length === 0) {
        return { valid: true, errors };
      } else {
        return { valid: false, errors };
      }
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    submit() {
      this.submitted = true;
      if (this.passwordValidation) {
        this.$emit("submit", {
          username: this.form.username,
          password: this.form.password,
        });
        console.log("sucess");
      }
      console.log("failed", this.form, this.passwordValidation);

      //   setTimeout(() => {
      //     this.submitted = false;
      //     this.form = JSON.parse(JSON.stringify(form));
      //   }, 5000);
    },
  },
};
</script>

<style></style>
