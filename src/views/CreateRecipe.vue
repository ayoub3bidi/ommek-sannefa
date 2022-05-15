<template>
    <div class="create-post">
        <div class="container">
            <div :class="{invisible: !error}" class="err-message">
                <p><span>Error:</span>{{ this.errorMsg }}</p>
            </div>
            <div class="info">
                <input type="text" placeholder="Enter Recipe title" v-model="recipeTitle">
                <div class="upload-file">
                    <label for="recipe-photo">Upload Cover Photo</label>
                    <input type="file" ref="recipPhoto" id="recipe-photo" accept=".png, .jpg, .jpeg">
                    <button class="preview" :class="{'button-inactive': !this.$store.state.recipePhotoFileURL}">Preview Photo</button>
                    <span>File Chosen: {{ this.$store.state.recipePhotoName }}</span>
                </div>
            </div>
            <div class="editor">
                <vue-editor :editorOptions="editorSettings" v-model="recipeHTML" useCustomImageHandler />
            </div>
            <div class="actions">
                <button>Publish</button>
                <router-link class="router-button" to="#">Post Preview</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
    name: "CreateRecipe",
    data() {
        return {
            error: null,
            errorMsg: null,
            editorSettings: {
                modules: {
                    imageResize: {}
                }
            }
        }
    }

}
</script>

<style>

</style>