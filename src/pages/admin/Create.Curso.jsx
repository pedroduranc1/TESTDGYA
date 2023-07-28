import React, { useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { useQuery } from "react-query";
import { User } from "../../api/fb.user";
import { CursosCtrl } from "../../api/fb.cursos";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../../utils/perfil.curso.form";
import { Input } from "../../components/ui/Input";
import { Loader2 } from "lucide-react";
import { toast } from "../../components/ui/use-toast";

const UserCtrl = new User();
const cursoCtrl = new CursosCtrl();
export const PageCurso = () => {
  const [CursoImg, setCursoImg] = useState("");

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery("Users", UserCtrl.getUsersWithRole);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const Slug = formValue.Titulo.replace(/\s+/g, "-");
      let CursoData = {
        ...formValue,
        Slug: Slug,
        curso_img: CursoImg ? await cursoCtrl.uploadCursoImage(CursoImg,formValue.Autor,Slug) : '',
      };
      const result = await cursoCtrl.createCurso(CursoData);
      if (result) {
        // El blog se creó correctamente
        toast({
          title: "Curso Creado Exitosamente",
        });
        
        formik.resetForm();
      } else {
        // Hubo un error al crear el blog
        toast({
          variant: "destructive",
          title: "Ocurrio un error al subir el Curso",
          description:
            "algo paso al monento de registrar los datos suministrados.",
        });
      }
    },
  });

  return (
    <MainLayout>
      <div className="w-full h-[88vh] px-[3%]">
        <h2 className="text-2xl font-bold text-center py-5">Crear Curso</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-2xl rounded-md p-8 shadow-lg mx-auto bg-white "
        >
          <div className="w-full space-y-3">
            <Input
              title={"Titulo"}
              className={"w-full"}
              name={"Titulo"}
              type={"text"}
              placeholder={"Curso Titulo"}
              value={formik.values.Titulo}
              onChange={formik.handleChange}
              error={formik.errors.Titulo}
            />
            <Input
              title={"Descripcion"}
              className={"w-full"}
              name={"Descripcion"}
              type={"text"}
              placeholder={"Curso Descripcion"}
              value={formik.values.Descripcion}
              onChange={formik.handleChange}
              error={formik.errors.Descripcion}
            />

            <h4 className="block mb-2 text-sm font-medium text-gray-900 ">
              Autor
            </h4>
            <select
              name={"Autor"}
              value={formik.values.Autor}
              onChange={formik.handleChange}
              className={`${
                formik.errors.Autor
                  ? "bg-red-500 placeholder:text-white text-white"
                  : ""
              } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
            >
              <option value="" label="Selecciona al Autor">
                Selecciona al Autor{" "}
              </option>
              {users &&
                users.map((user, index) => (
                  <option key={index} value={user.uid}>
                    {" "}
                    {user.Username}
                  </option>
                ))}
            </select>

            <Input
              title={"Sube una imagen para tu blog"}
              className={"w-full"}
              name={"markdown"}
              type={"file"}
              onChange={(event) => {
                setCursoImg(event.currentTarget.files[0]);
              }}
            />

            <button
              type="submit"
              className="w-full px-2 py-2 flex items-center justify-center hover:bg-black/70 transition-colors bg-black text-white rounded-md"
            >
              {formik.isSubmitting ? (
                <Loader2 className="animate-spin animate-infinite" />
              ) : (
                "Crear Curso"
              )}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};
