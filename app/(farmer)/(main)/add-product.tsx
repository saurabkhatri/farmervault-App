import InputField from "@/components/common/input-field";
import { addProduct } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Quantity must be a non-negative number",
    }),
  category: z.string().min(2, "Category is required"),
});

type ProductForm = z.infer<typeof productSchema>;

export default function AddProduct() {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
  });

  const [images, setImages] = useState<any[]>([]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
      aspect: [4, 3],
    });
    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Alert.alert("Product Added", "Product submitted with images!");
      reset();
      setImages([]);
    },
    onError: (error: any) => {
      console.log(error);
      Alert.alert("Error", error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: ProductForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("category", data.category);
    if (images && images.length > 0) {
      images.forEach((img) => {
        formData.append("productImage", {
          uri: img.uri,
          name: img.uri.split("/").pop(),
          type: mime.getType(img.uri) || "image/jpeg",
        } as any);
      });
    }
    mutation.mutate(formData);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ width: "100%" }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Product Name"
                placeholder="Enter product name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
                touched={touchedFields.name}
                autoCapitalize="words"
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Price"
                placeholder="Enter price"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.price?.message}
                touched={touchedFields.price}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Quantity"
                placeholder="Enter quantity"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.quantity?.message}
                touched={touchedFields.quantity}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Category"
                placeholder="Enter category"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.category?.message}
                touched={touchedFields.category}
                autoCapitalize="words"
              />
            )}
          />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Images</Text>
            <TouchableOpacity
              style={styles.imagePickerBtn}
              onPress={pickImages}
            >
              <Ionicons
                name="images-outline"
                size={24}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.imagePickerText}>
                {images.length > 0 ? "Change Images" : "Pick Images"}
              </Text>
            </TouchableOpacity>
            {images.length > 0 && (
              <FlatList
                data={images}
                horizontal
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.imagePreview}
                  />
                )}
                contentContainerStyle={styles.imageList}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.submitBtn,
              mutation.isPending && styles.submitBtnDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={mutation.isPending}
            activeOpacity={0.8}
          >
            <Text style={styles.submitBtnText}>
              {mutation.isPending ? "Adding..." : "Add Product"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 40,
    backgroundColor: "#f7f9fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 28,
    color: "#2575fc",
    letterSpacing: 0.5,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 18,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
    fontSize: 16,
  },
  inputIconRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2eafc",
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: "#2575fc",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  imagePickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2575fc",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 4,
    marginBottom: 10,
    shadowColor: "#2575fc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  imageList: {
    paddingVertical: 6,
  },
  imagePreview: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e2eafc",
    backgroundColor: "#fff",
  },
  error: {
    color: "#ff6b6b",
    fontSize: 13,
    marginTop: 2,
    marginLeft: 2,
  },
  submitBtn: {
    backgroundColor: "#2575fc",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    shadowColor: "#2575fc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  submitBtnDisabled: {
    backgroundColor: "#a0aec0",
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
