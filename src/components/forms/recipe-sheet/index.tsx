"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RecipeIngredient,
  RecipeSheet,
  TAX_RATES,
  recipeSchema,
} from "@/lib/types/recipe";
import { yupResolver } from "@hookform/resolvers/yup";
import { HelpCircle, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  FormContext,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import useRecipeForm from "./useRecipeForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/shadcn-ui";

const recipeRowDefaultValues: RecipeIngredient = {
  name: "",
  provider: "",
  quantity: 0,
  unit: "",
  unitPrice: 0,
  totalPrice: 0,
};

export type RecipeFormValues = yup.InferType<typeof recipeSchema>;

const INITIAL_VALUES: RecipeFormValues = {
  title: "",
  fixedCosts: 0,
  ingredients: [recipeRowDefaultValues],
  seasoning: 0,
  tags: [],
  taxRate: 10,
  description: "",
  equipment: "",
  timeToAchieve: 0,
  ingredientsTotalPrice: 0,
  margin: 0,
  marginRate: 0,
  sellingPriceWithoutTaxes: 0,
  sellingPriceWithTaxes: 0,
  totalRecipeCost: 0,
};

interface RecipeSheetFormProps {
  recipe?: RecipeSheet;
  onSubmitSuccess: (formValues: RecipeFormValues) => void;
}

const RecipeSheetForm = ({ recipe, onSubmitSuccess }: RecipeSheetFormProps) => {
  const form = useForm<RecipeFormValues>({
    defaultValues: recipe ?? INITIAL_VALUES,
    resolver: yupResolver(recipeSchema),
  });

  const { setIngredientTotalPrice } = useRecipeForm(form);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  return (
    <FormContext {...form}>
      <form onSubmit={form.handleSubmit(onSubmitSuccess)}>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>1. Informations</CardTitle>
              <CardDescription>
                Commencez par définir les informations de base de votre recette
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-4 md:col-span-2">
                      <FormLabel>Titre de la recette *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Pizza 3 fromages..." />
                      </FormControl>
                      <FormDescription>
                        Ce titre ne sera pas visible par vos clients
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="hidden lg:block lg:col-span-1" />
                <FormField
                  control={form.control}
                  name="timeToAchieve"
                  render={({ field }) => (
                    <FormItem className="col-span-4 md:col-span-2 lg:col-span-1">
                      <FormLabel>Temps de réalisation</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="1h45m..." />
                      </FormControl>
                      <FormDescription>
                        Estimez le temps de réalisation (en minutes)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Ingrédients</CardTitle>
              <CardDescription>
                Ajoutez les ingrédients nécessaires à votre recette
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead id="header-name">
                      Nom de l&apos;ingrédient
                    </TableHead>
                    <TableHead id="header-provider">Fournisseur</TableHead>
                    <TableHead id="header-unit">Unité</TableHead>
                    <TableHead id="header-unitPrice">
                      Coût unitaire HT
                    </TableHead>
                    <TableHead id="header-quantity">Quantité</TableHead>
                    <TableHead id="header-ingredientTotalPrice">
                      Coût de l&apos;ingrédient
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.length > 0 &&
                    fields.map((arrayField, index) => (
                      <TableRow key={`${arrayField.id}-${index}`}>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`ingredients.${index}.name`}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    aria-describedby="header-name"
                                    className={cn(
                                      "col-span-1",
                                      fieldState?.error && "border-destructive"
                                    )}
                                    key={arrayField.id}
                                    placeholder="Tomates..."
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`ingredients.${index}.provider`}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className={cn(
                                      "col-span-1",
                                      fieldState?.error && "border-destructive"
                                    )}
                                    aria-describedby="header-provider"
                                    key={arrayField.id}
                                    placeholder="Mon fournisseur..."
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`ingredients.${index}.unit`}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className={cn(
                                      "col-span-1",
                                      fieldState?.error && "border-destructive"
                                    )}
                                    key={arrayField.id}
                                    aria-describedby="header-unit"
                                    placeholder="kg"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`ingredients.${index}.unitPrice`}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className={cn(
                                      "col-span-1",
                                      fieldState?.error && "border-destructive"
                                    )}
                                    key={arrayField.id}
                                    aria-describedby="header-unitPrice"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setIngredientTotalPrice(index);
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`ingredients.${index}.quantity`}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className={cn(
                                      "col-span-1",
                                      fieldState?.error && "border-destructive"
                                    )}
                                    key={arrayField.id}
                                    aria-describedby="header-quantity"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setIngredientTotalPrice(index);
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`ingredients.${index}.totalPrice`}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className={cn(
                                      "col-span-1",
                                      fieldState?.error && "border-destructive"
                                    )}
                                    disabled
                                    type="number"
                                    step="0.01"
                                    aria-describedby="header-ingredientsTotalPrice"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            aria-label="Ajouter un ingrédient"
                            title="Ajouter un ingrédient"
                            onClick={() =>
                              /** TODO: Validate row before appending */
                              append(recipeRowDefaultValues)
                            }
                          >
                            <Plus className="h-4 w-4 text-primary" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            aria-label="Supprimer cet ingrédient"
                            title="Supprimer cet ingrédient"
                            onClick={() => remove(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {fields.length === 0 && (
                <div className="flex flex-col flex-1 justify-center items-center mt-8">
                  <p>Vous n&apos;avez aucun ingrédient dans cette recette.</p>
                  <Button onClick={() => append(recipeRowDefaultValues)}>
                    Ajouter un ingrédient
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="grid grid-cols-3">
                <div className="hidden md:block md:col-span-1 lg:col-span-2" />
                <div className="col-span-3 md:col-span-2 lg:col-span-1 grid grid-cols-3 gap-4">
                  <div className="col-span-2 border rounded-md flex items-center px-2">
                    <p>Coût total des ingrédients HT</p>
                  </div>
                  <FormField
                    control={form.control}
                    name="ingredientsTotalPrice"
                    disabled
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="col-span-1"
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2 border rounded-md flex items-center px-2">
                    <p>Coût de l&apos;assaisonnement</p>
                    <span className="ml-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle size={16} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Huile, épices, graines, ...</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="seasoning"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="col-span-1"
                            type="number"
                            step="0.01"
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2 border rounded-md flex items-center px-2">
                    <p>Frais fixes</p>
                    <span className="ml-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle size={16} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sac en papier, couverts, serviettes...</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="fixedCosts"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="col-span-1"
                            type="number"
                            step="0.01"
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2 border rounded-md flex items-center">
                    <p className="px-2">Coût total de la recette HT</p>
                  </div>
                  <FormField
                    control={form.control}
                    name="totalRecipeCost"
                    disabled
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="col-span-1"
                            type="number"
                            step="0.01"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Informations financières</CardTitle>
              <CardDescription>
                Définissez votre marge et la TVA pour obtenir les prix de vente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-1 grid grid-cols-3 grid-rows-2 md:grid-rows-3 gap-4">
                  <div className="col-span-2 row-span-1 border rounded-md flex items-center">
                    <p className="px-2">Taux de marge (%)</p>
                  </div>
                  <FormField
                    control={form.control}
                    name="marginRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="col-span-1"
                            type="number"
                            min={0}
                            step="0.01"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="hidden md:block md:row-span-1 md:col-span-2" />
                  <div className="col-span-2 row-span-1 border rounded-md flex items-center">
                    <p className="px-2">TVA</p>
                  </div>
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="taxRate"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value.toString()}
                          defaultValue={field.value.toString()}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TAX_RATES.map((tax) => (
                              <SelectItem key={tax} value={tax.toString()}>
                                {tax} %
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="col-span-1 grid grid-cols-3 grid-rows-3 gap-4">
                  <div className="col-span-2 row-span-1 border rounded-md flex items-center">
                    <p className="px-2">Marge brute</p>
                  </div>
                  <FormField
                    control={form.control}
                    name="margin"
                    disabled
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="col-span-1"
                            type="number"
                            step="0.01"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2 row-span-1 border rounded-md flex items-center">
                    <p className="px-2">Prix de vente HT</p>
                  </div>
                  <FormField
                    control={form.control}
                    name="sellingPriceWithoutTaxes"
                    disabled
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="col-span-1"
                            type="number"
                            step="0.01"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2 row-span-1 border rounded-md flex items-center">
                    <p className="px-2">Prix de vente TTC</p>
                  </div>
                  <FormField
                    control={form.control}
                    name="sellingPriceWithTaxes"
                    disabled
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="col-span-1"
                            type="number"
                            step="0.01"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>4. Informations complémentaires</CardTitle>
              <CardDescription>
                Ajoutez les informations nécessaires pour vous aider à réaliser
                la recette
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description de la recette</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Couper les tomates en dés..."
                        />
                      </FormControl>
                      <FormDescription>
                        Décrivez votre recette en étapes pour vous aider à la
                        réaliser.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="equipment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matériel nécessaire</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="- 2 casseroles..." />
                      </FormControl>
                      <FormDescription>
                        Listez le matériel dont vous avez besoin.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <div>
            <Button type="submit" className="w-full lg:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Créer la recette
            </Button>
          </div>
        </div>
      </form>
    </FormContext>
  );
};

export default RecipeSheetForm;
