<template>
  <div class="w-full">
    <div
      class="flex flex-col w-full max-w-md p-8 mx-auto text-left border shadow-sm 2xl:my-10 "
    >
      <div
        class="justify-center mb-4 text-2xl font-bold text-center fx-i text-title"
      >
        <div class="space-x-2 fx-i">
          <img class="w-8 mx-auto" alt="Vue logo" src="./../assets/logo.png" />
          {{ this.$route.name }}
        </div>
      </div>
      <label class="text-lg font-medium">Username </label>
      <input
        @input="cleardefault()"
        autocomplete="username"
        class="w-full p-2 border"
        type="text"
        v-model="form.username"
        placeholder="Username"
        name="username"
        required
      />
      <label class="mt-4 text-lg font-medium">Password </label>
      <div class="relative justify-end fx-i">
        <button @click="togglePasswordVisibility()" class="absolute mx-4">
          <font-awesome-icon v-if="!passwordVisible" icon="eye" />
          <font-awesome-icon v-if="passwordVisible" icon="eye-slash" />
        </button>

        <input
          @input="cleardefault()"
          autocomplete="current-password"
          class="w-full p-2 pr-12 border"
          :type="passwordVisible ? 'text' : 'password'"
          v-model="form.password"
          placeholder=" Password"
          name="password"
          required
        />
      </div>
      <div v-if="submitted & passwordValidation.errors.length">
        <h2>Hints:</h2>
        <p
          class="text-red-500"
          v-for="(error, index) in passwordValidation.errors"
          :key="index"
        >
          {{ error }}
        </p>
        <p
          class="text-red-500"
          v-for="(error, index) in usernameValidation.errors"
          :key="index"
        >
          {{ error }}
        </p>
      </div>
      <button class="px-6 py-2 mt-8 text-white border blue" @click="submit()">
        {{ this.$route.name }}
      </button>
      <router-link
        class="mt-1"
        :to="
          this.$route.name === 'login'
            ? { path: '/Register' }
            : { path: '/login' }
        "
      >
        click here to
        <span class="text-blue-500 underline"
          >{{ this.$route.name === "login" ? "Register" : "login" }} </span
        >!
      </router-link>

      <p class="mt-4 text-center text-red-500">{{ message }}</p>
    </div>

    <div class="w-full text-xs text-center xl:absolute bottom-2">
      <p class="text-red-500">Note: * admin  user and password are auto created with mongo please login with credentials  <br>
      password minimun character validation relaxed for admin  as default (credentials  mentioned in document)! 
      </p>
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
  props: {
    message: {
      typeof: String,
      requied: false,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      passwordRules: [
        // { message: "One lowercase letter required.", regex: /[a-z]+/ },
        // { message: "One uppercase letter required.", regex: /[A-Z]+/ },
        //	{ message:"One number required.", regex:/[0-9]+/ }
        { message: "password requires atleast  8 characters ", regex: /.{8,}/ },
      ],
      usernameRules: [{ message: "username required", regex: /.{1,}/ }],
      passwordVisible: false,
      submitted: false,
      form: JSON.parse(JSON.stringify(form)),
    };
  },

  computed: {
    passwordValidation() {
      let errors = [];
      for (let condition of this.passwordRules) {
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
    usernameValidation() {
      let errors = [];
      for (let condition of this.usernameRules) {
        if (!condition.regex.test(this.form.username)) {
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
    cleardefault() {
      this.submitted = false;
      this.$emit("clearmessage");
    },

    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    submit() {
      this.submitted = true;
      if (
        this.passwordValidation.valid & this.usernameValidation.valid ||
        this.form.username === "admin"
      ) {
        this.$emit("submit", {
          username: this.form.username,
          password: this.form.password,
        });
        console.log("sucess");
      }
      console.log(
        "failed",
        this.form,
        this.passwordValidation,
        this.usernameValidation
      );

      //   setTimeout(() => {
      //     this.submitted = false;
      //     this.form = JSON.parse(JSON.stringify(form));
      //   }, 5000);
    },
  },
};
</script>

<style></style>
